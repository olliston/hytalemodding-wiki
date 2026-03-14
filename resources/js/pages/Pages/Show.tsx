import { PencilIcon, EyeIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ChevronRightIcon, HammerIcon, PlusIcon } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/utils/commonUtils';
import { getMarkdownPreview } from '@/utils/markdown';

interface User {
  id: number;
  name: string;
  username: string;
}

interface Mod {
  id: string;
  name: string;
  slug: string;
  visibility: 'public' | 'private' | 'unlisted';
  github_repository_url?: string | null;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  kind: 'page' | 'category';
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  creator: User;
  updater?: User;
  path: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
  children?: Page[];
}

interface NavigationPage {
  id: string;
  title: string;
  slug: string;
  kind: 'page' | 'category';
  published: boolean;
  children?: NavigationPage[];
}

interface Props {
  mod: Mod;
  page: Page;
  navigation: NavigationPage[];
  userRole?: string;
  canEdit: boolean;
}

export default function ShowPage({ mod, page, navigation, canEdit }: Props) {
  const isGithubManaged = Boolean(mod.github_repository_url);

  const renderNavigation = (pages: NavigationPage[], level = 0) => {
    return pages
      .filter((navPage) => navPage.published || canEdit)
      .map((navPage) => (
        <div key={navPage.id} style={{ marginLeft: `${level * 16}px` }}>
          <div className="flex items-center gap-2">
            <a
              href={`/dashboard/mods/${mod.slug}/pages/${navPage.slug}`}
              className={`block rounded px-2 py-1 text-sm ${
                navPage.id === page.id
                  ? 'font-medium text-primary underline'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {navPage.title}
            </a>
            {navPage.kind === 'category' && (
              <Badge variant="secondary" className="text-xs">
                Category
              </Badge>
            )}
            {navPage.published === false && (
              <span className="flex items-center gap-0.5 bg-transparent text-xs text-yellow-400">
                <HammerIcon className="mr-1 h-3 w-3" />
                Draft
              </span>
            )}
          </div>
          {navPage.children && navPage.children.length > 0 &&
            renderNavigation(navPage.children, level + 1)}
        </div>
      ));
  };

  return (
    <AppLayout>
      <Head title={`${page.title} - ${mod.name}`} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-none bg-transparent">
              <CardHeader>
                <CardTitle className="text-lg">{mod.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">{renderNavigation(navigation)}</nav>

                {canEdit && !isGithubManaged && (
                  <div className="border-t pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <a href={`/dashboard/mods/${mod.slug}/pages/create`}>
                        <PlusIcon className="h-4 w-4" />
                        Add New Page
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Breadcrumbs */}
            <nav className="mb-6 text-sm text-primary">
              <a
                href={`/dashboard/mods/${mod.slug}`}
                className="hover:underline"
              >
                {mod.name}
              </a>
              {page.path &&
                page.path.length > 0 &&
                page.path.map((pathItem, index) => (
                  <span key={pathItem.id}>
                    <ChevronRightIcon className="m-1 inline h-4 w-4" />
                    {index === page.path.length - 1 ? (
                      <span className="font-medium text-primary">
                        {pathItem.title}
                      </span>
                    ) : (
                      <a
                        href={`/dashboard/mods/${mod.slug}/pages/${pathItem.slug}`}
                        className="hover:underline"
                      >
                        {pathItem.title}
                      </a>
                    )}
                  </span>
                ))}
            </nav>

            {/* Page Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-primary">
                  {page.title}
                </h1>
                {page.kind === 'category' && (
                  <Badge variant="secondary" className="mb-2">
                    Category
                  </Badge>
                )}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>By {page.creator.name}</span>
                  <span>•</span>
                  <span>Updated {formatDate(page.updated_at)}</span>
                  {!page.published && (
                    <>
                      <span>•</span>
                      <Badge
                        variant="outline"
                        className="border border-yellow-400 bg-transparent font-bold text-yellow-400"
                      >
                        Draft
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                {mod.visibility === 'public' && page.published && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/mod/${mod.slug}/${page.slug}`} target="_blank">
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Public View
                    </a>
                  </Button>
                )}
                {canEdit && !isGithubManaged && (
                  <Button size="sm" asChild>
                    <a
                      href={`/dashboard/mods/${mod.slug}/pages/${page.slug}/edit`}
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Edit
                    </a>
                  </Button>
                )}
                {canEdit && isGithubManaged && (
                  <p className="text-sm text-muted-foreground">
                    This page is synced from GitHub and cannot be edited
                    manually.
                  </p>
                )}
              </div>
            </div>

            {/* Page Content */}
            <Card>
              <CardContent className="pt-6">
                {page.kind === 'category' && !page.content ? (
                  <p className="text-muted-foreground">
                    This category groups related pages.
                  </p>
                ) : (
                  <MarkdownRenderer
                    content={page.content || 'This page is empty.'}
                  />
                )}
              </CardContent>
            </Card>

            {/* Child Pages */}
            {page.children && page.children.length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpenIcon className="mr-2 h-5 w-5" />
                    Child Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {page.children.map((child) => (
                      <a
                        key={child.id}
                        href={`/dashboard/mods/${mod.slug}/pages/${child.slug}`}
                        className="block rounded-lg border p-4 transition-shadow hover:bg-muted-foreground/5 hover:shadow-md"
                      >
                        <h3 className="mb-1 font-medium text-primary">
                          {child.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getMarkdownPreview(child.content || '', 150)}
                        </p>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Page Footer */}
            <div className="mt-8 border-t pt-6 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <div>
                  Last updated by {page.updater?.name || page.creator.name}
                  on {formatDate(page.updated_at)}
                </div>
                {canEdit && !isGithubManaged && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`/dashboard/mods/${mod.slug}/pages/${page.slug}/edit`}
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Improve this Page
                    </a>
                  </Button>
                )}
                {canEdit && !isGithubManaged && page.kind === 'category' && (
                  <Button size="sm" asChild>
                    <a
                      href={`/dashboard/mods/${mod.slug}/pages/create?parent_id=${page.id}`}
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Child Page
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
