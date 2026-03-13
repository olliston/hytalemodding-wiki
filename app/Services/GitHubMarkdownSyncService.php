<?php

namespace App\Services;

use App\Models\Mod;
use App\Models\Page;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class GitHubMarkdownSyncService
{
    /**
     * @return array{created:int,updated:int,deleted:int,total:int}
     */
    public function syncMod(Mod $mod, bool $prune = false, bool $dryRun = false): array
    {
        [$owner, $repo] = $this->parseRepository($mod->github_repository_url);
        $basePath = $this->normalizeBasePath($mod->github_repository_path);
        $branch = $this->fetchDefaultBranch($owner, $repo);

        $files = [];
        $this->fetchMarkdownFiles($owner, $repo, $branch, $basePath, $basePath, $files);

        usort($files, fn (array $a, array $b) => strcmp($a['path'], $b['path']));

        if ($dryRun) {
            return [
                'created' => 0,
                'updated' => 0,
                'deleted' => 0,
                'total' => count($files),
            ];
        }

        return DB::transaction(function () use ($mod, $files, $prune) {
            $created = 0;
            $updated = 0;
            $deleted = 0;
            $indexPageId = null;

            /** @var array<string, \App\Models\Page> $pagesBySourcePath */
            $pagesBySourcePath = [];

            $legacyPagesQuery = Page::where('mod_id', $mod->id)
                ->where(function ($query) {
                    $query->whereNull('source_type')
                        ->orWhere('source_type', '!=', 'github');
                });

            $deleted += (clone $legacyPagesQuery)->count();
            $legacyPagesQuery->delete();

            $existingGithubPages = Page::withTrashed()
                ->where('mod_id', $mod->id)
                ->where('source_type', 'github')
                ->get()
                ->keyBy('source_path');

            foreach ($files as $orderIndex => $file) {
                $sourcePath = $file['path'];
                $page = $existingGithubPages->get($sourcePath);
                $parsedContent = $this->parseFrontMatter($file['content']);
                $metadata = $parsedContent['metadata'];

                $isNew = false;

                if (! $page) {
                    $isNew = true;
                    $page = new Page([
                        'mod_id' => $mod->id,
                        'created_by' => $mod->owner_id,
                    ]);
                } elseif ($page->trashed()) {
                    $page->restore();
                }

                $page->source_type = 'github';
                $page->source_path = $sourcePath;
                $page->source_sha = $file['sha'];
                $page->kind = Page::KIND_PAGE;
                $page->title = $this->resolveTitle($sourcePath, $metadata);
                $page->content = $parsedContent['content'];
                $page->published = $this->resolvePublished($metadata);
                $page->updated_by = $mod->owner_id;
                $page->order_index = $this->resolveOrderIndex($metadata, $orderIndex);
                $page->is_index = $this->resolveIndexFlag($sourcePath, $metadata);

                if (! $page->slug) {
                    $page->slug = $this->buildUniqueSlug($mod, $page->title, $page->id);
                }

                $page->save();

                if ($page->is_index) {
                    $indexPageId = $page->id;
                }

                $pagesBySourcePath[$sourcePath] = $page;

                if ($isNew) {
                    $created++;
                } else {
                    $updated++;
                }
            }

            foreach ($pagesBySourcePath as $sourcePath => $page) {
                $parentSourcePath = $this->parentReadmeSourcePath($sourcePath);
                $parentId = $parentSourcePath ? ($pagesBySourcePath[$parentSourcePath]->id ?? null) : null;

                if ($page->parent_id !== $parentId) {
                    $page->parent_id = $parentId;
                    $page->updated_by = $mod->owner_id;
                    $page->save();
                }
            }

            if ($indexPageId) {
                Page::where('mod_id', $mod->id)
                    ->where('is_index', true)
                    ->where('id', '!=', $indexPageId)
                    ->update(['is_index' => false]);
            }

            if ($prune) {
                $syncedPaths = array_keys($pagesBySourcePath);

                $pagesToDelete = Page::where('mod_id', $mod->id)
                    ->where('source_type', 'github')
                    ->whereNotIn('source_path', $syncedPaths)
                    ->get();

                foreach ($pagesToDelete as $page) {
                    $page->delete();
                    $deleted++;
                }
            }

            return [
                'created' => $created,
                'updated' => $updated,
                'deleted' => $deleted,
                'total' => count($files),
            ];
        });
    }

    /**
     * @return array{0:string,1:string}
     */
    private function parseRepository(?string $repositoryUrl): array
    {
        if (! $repositoryUrl) {
            throw new RuntimeException('Missing GitHub repository URL.');
        }

        $trimmed = trim($repositoryUrl);

        if (! preg_match('~github\.com[:/](?<owner>[A-Za-z0-9_.-]+)/(?<repo>[A-Za-z0-9_.-]+?)(?:\.git)?/?$~', $trimmed, $matches)) {
            throw new RuntimeException("Invalid GitHub repository URL: {$repositoryUrl}");
        }

        return [$matches['owner'], $matches['repo']];
    }

    private function normalizeBasePath(?string $repositoryPath): string
    {
        $path = trim((string) $repositoryPath);

        if ($path === '' || $path === '/') {
            return '';
        }

        return trim($path, '/');
    }

    private function fetchDefaultBranch(string $owner, string $repo): string
    {
        $response = $this->githubClient()
            ->get("https://api.github.com/repos/{$owner}/{$repo}");

        if (! $response->successful()) {
            throw new RuntimeException("Unable to read repository metadata for {$owner}/{$repo}.");
        }

        return (string) $response->json('default_branch', 'main');
    }

    /**
     * @param  array<int, array{path:string,sha:string,content:string}>  $files
     */
    private function fetchMarkdownFiles(string $owner, string $repo, string $branch, string $basePath, string $currentPath, array &$files): void
    {
        $contentsUrl = "https://api.github.com/repos/{$owner}/{$repo}/contents";

        if ($currentPath !== '') {
            $contentsUrl .= '/'.$this->encodePath($currentPath);
        }

        $response = $this->githubClient()->get($contentsUrl, ['ref' => $branch]);

        if ($response->status() === 404) {
            return;
        }

        if (! $response->successful()) {
            throw new RuntimeException("Unable to read repository contents from {$owner}/{$repo} ({$currentPath}).");
        }

        $items = $response->json();

        if (isset($items['type'])) {
            $items = [$items];
        }

        foreach ($items as $item) {
            if (($item['type'] ?? null) === 'dir') {
                $this->fetchMarkdownFiles($owner, $repo, $branch, $basePath, $item['path'], $files);

                continue;
            }

            if (($item['type'] ?? null) !== 'file') {
                continue;
            }

            $name = (string) ($item['name'] ?? '');
            if (! str_ends_with(strtolower($name), '.md')) {
                continue;
            }

            $downloadUrl = (string) ($item['download_url'] ?? '');
            if ($downloadUrl === '') {
                continue;
            }

            $contentResponse = Http::timeout(30)->get($downloadUrl);

            if (! $contentResponse->successful()) {
                throw new RuntimeException("Unable to download markdown file: {$downloadUrl}");
            }

            $fullPath = (string) ($item['path'] ?? '');
            $relativePath = $this->toRelativePath($fullPath, $basePath);

            if ($relativePath === '') {
                continue;
            }

            $files[] = [
                'path' => $relativePath,
                'sha' => (string) ($item['sha'] ?? ''),
                'content' => $contentResponse->body(),
            ];
        }
    }

    private function toRelativePath(string $fullPath, string $basePath): string
    {
        $normalizedFullPath = ltrim($fullPath, '/');

        if ($basePath === '') {
            return $normalizedFullPath;
        }

        $prefix = $basePath.'/';

        if ($normalizedFullPath === $basePath) {
            return '';
        }

        if (str_starts_with($normalizedFullPath, $prefix)) {
            return substr($normalizedFullPath, strlen($prefix));
        }

        return $normalizedFullPath;
    }

    private function encodePath(string $path): string
    {
        $segments = array_filter(explode('/', $path), fn (string $segment) => $segment !== '');

        return implode('/', array_map('rawurlencode', $segments));
    }

    private function titleFromPath(string $sourcePath): string
    {
        $directory = dirname($sourcePath);
        $filename = pathinfo($sourcePath, PATHINFO_FILENAME);

        if (strtoupper($filename) === 'README') {
            if ($directory === '.') {
                return 'Home';
            }

            return Str::headline(basename($directory));
        }

        return Str::headline($filename);
    }

    /**
     * @param  array<string, mixed>  $metadata
     */
    private function resolveTitle(string $sourcePath, array $metadata): string
    {
        $title = $metadata['title'] ?? null;

        if (is_string($title) && trim($title) !== '') {
            return trim($title);
        }

        return $this->titleFromPath($sourcePath);
    }

    /**
     * @param  array<string, mixed>  $metadata
     */
    private function resolvePublished(array $metadata): bool
    {
        if (isset($metadata['published']) && is_bool($metadata['published'])) {
            return $metadata['published'];
        }

        if (isset($metadata['draft']) && is_bool($metadata['draft'])) {
            return ! $metadata['draft'];
        }

        return true;
    }

    /**
     * @param  array<string, mixed>  $metadata
     */
    private function resolveIndexFlag(string $sourcePath, array $metadata): bool
    {
        if (isset($metadata['is_index']) && is_bool($metadata['is_index'])) {
            return $metadata['is_index'];
        }

        return $sourcePath === 'README.md';
    }

    /**
     * @param  array<string, mixed>  $metadata
     */
    private function resolveOrderIndex(array $metadata, int $default): int
    {
        $order = $metadata['order'] ?? null;

        return is_int($order) ? $order : $default;
    }

    /**
     * @return array{metadata: array<string, mixed>, content: string}
     */
    private function parseFrontMatter(string $rawContent): array
    {
        if (! preg_match('/\A---\r?\n(?<frontmatter>.*?)\r?\n---\r?\n(?<content>.*)\z/s', $rawContent, $matches)) {
            return [
                'metadata' => [],
                'content' => $rawContent,
            ];
        }

        $metadata = [];

        foreach (preg_split('/\r?\n/', (string) $matches['frontmatter']) as $line) {
            $line = trim($line);

            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }

            [$key, $value] = array_pad(explode(':', $line, 2), 2, null);

            if ($value === null) {
                continue;
            }

            $key = trim((string) $key);
            $value = trim((string) $value);

            if ($key === '') {
                continue;
            }

            $metadata[$key] = $this->parseFrontMatterValue($value);
        }

        return [
            'metadata' => $metadata,
            'content' => (string) $matches['content'],
        ];
    }

    /**
     * @return string|bool|int
     */
    private function parseFrontMatterValue(string $value)
    {
        if ($value === 'true') {
            return true;
        }

        if ($value === 'false') {
            return false;
        }

        if (preg_match('/^-?\d+$/', $value)) {
            return (int) $value;
        }

        if (
            (str_starts_with($value, '"') && str_ends_with($value, '"')) ||
            (str_starts_with($value, "'") && str_ends_with($value, "'"))
        ) {
            return substr($value, 1, -1);
        }

        return $value;
    }

    private function parentReadmeSourcePath(string $sourcePath): ?string
    {
        $directory = dirname($sourcePath);

        if ($directory === '.') {
            return null;
        }

        return $directory.'/README.md';
    }

    private function buildUniqueSlug(Mod $mod, string $title, ?string $ignorePageId = null): string
    {
        $baseSlug = Str::slug($title);
        $slugRoot = $baseSlug !== '' ? $baseSlug : 'page';
        $slug = $slugRoot;
        $counter = 1;

        while (Page::where('mod_id', $mod->id)
            ->where('slug', $slug)
            ->when($ignorePageId, fn ($query) => $query->where('id', '!=', $ignorePageId))
            ->exists()) {
            $slug = $slugRoot.'-'.$counter;
            $counter++;
        }

        return $slug;
    }

    private function githubClient()
    {
        return Http::timeout(30)
            ->acceptJson()
            ->withHeaders([
                'User-Agent' => 'wiki-mod-sync',
                'X-GitHub-Api-Version' => '2022-11-28',
            ]);
    }
}

