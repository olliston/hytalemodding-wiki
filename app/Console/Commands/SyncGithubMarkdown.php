<?php

namespace App\Console\Commands;

use App\Models\Mod;
use App\Services\GitHubMarkdownSyncService;
use Illuminate\Console\Command;
use RuntimeException;

class SyncGithubMarkdown extends Command
{
    protected $signature = 'mods:sync-github-markdown
                            {--mod= : Mod UUID or slug to sync}
                            {--prune : Soft-delete synced pages that no longer exist in the repository}
                            {--dry-run : Show files discovered without writing to the database}';

    protected $description = 'Sync markdown files from configured public GitHub repositories into mod pages';

    public function handle(GitHubMarkdownSyncService $syncService): int
    {
        $mods = Mod::query()
            ->whereNotNull('github_repository_url')
            ->where('github_repository_url', '!=', '');

        if ($modFilter = $this->option('mod')) {
            $mods->where(function ($query) use ($modFilter) {
                $query->where('id', $modFilter)
                    ->orWhere('slug', $modFilter);
            });
        }

        $mods = $mods->orderBy('name')->get();

        if ($mods->isEmpty()) {
            $this->warn('No mods found with GitHub integration enabled.');

            return self::SUCCESS;
        }

        $this->info("Syncing {$mods->count()} mod(s)...");

        $totalCreated = 0;
        $totalUpdated = 0;
        $totalDeleted = 0;
        $totalFiles = 0;
        $hasErrors = false;

        foreach ($mods as $mod) {
            try {
                $result = $syncService->syncMod(
                    mod: $mod,
                    prune: (bool) $this->option('prune'),
                    dryRun: (bool) $this->option('dry-run'),
                );

                $totalCreated += $result['created'];
                $totalUpdated += $result['updated'];
                $totalDeleted += $result['deleted'];
                $totalFiles += $result['total'];

                $this->line("- {$mod->name}: {$result['total']} file(s), +{$result['created']} created, ~{$result['updated']} updated, -{$result['deleted']} removed");
            } catch (RuntimeException $exception) {
                $hasErrors = true;
                $this->error("- {$mod->name}: {$exception->getMessage()}");
            }
        }

        $this->newLine();
        $this->table(
            ['Files Seen', 'Created', 'Updated', 'Removed'],
            [[$totalFiles, $totalCreated, $totalUpdated, $totalDeleted]]
        );

        return $hasErrors ? self::FAILURE : self::SUCCESS;
    }
}
