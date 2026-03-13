import { BookOpenIcon } from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface User {
  id: number;
  name: string;
  username: string;
}

interface Mod {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_url: string | null;
  visibility: 'public';
  owner: User;
  published_pages_count: number;
  updated_at: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedMods {
  data: Mod[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: PaginationLink[];
}

interface Props {
  mods: PaginatedMods;
  query: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function PublicMods({ mods, query }: Props) {
  const [search, setSearch] = useState(query ?? '');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.get('/mods', search ? { q: search } : {}, {
      preserveState: true,
      replace: true,
    });
  }

  return (
    <>
      <Head title="Browse Mods" />

      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <AppNavbar brandHref="/" />

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 md:px-8 md:py-14">
          <div className="mb-10 space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Browse Mods
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Explore publicly available Hytale mod wikis from the community.
            </p>

            <form onSubmit={handleSearch} className="flex max-w-md gap-2">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search mods…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit" variant="secondary">
                Search
              </Button>
            </form>
          </div>

          {query && (
            <p className="mb-6 text-sm text-muted-foreground">
              {mods.total} result{mods.total !== 1 ? 's' : ''} for &ldquo;
              {query}&rdquo;
            </p>
          )}

          {mods.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <BookOpenIcon className="mb-4 h-14 w-14 text-muted-foreground/50" />
              <h2 className="mb-2 text-lg font-semibold">No mods found</h2>
              <p className="text-muted-foreground">
                {query
                  ? 'Try a different search term.'
                  : 'No public mods have been created yet.'}
              </p>
              {query && (
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() => {
                    setSearch('');
                    router.get('/mods', {}, { replace: true });
                  }}
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mods.data.map((mod) => (
                <ModCard key={mod.id} mod={mod} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {mods.last_page > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-1">
              {mods.links.map((link, i) => (
                <Button
                  key={i}
                  variant={link.active ? 'default' : 'ghost'}
                  size="sm"
                  disabled={!link.url}
                  onClick={() => link.url && router.get(link.url)}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className="min-w-9"
                />
              ))}
            </div>
          )}
        </main>

        <AppFooter />
      </div>
    </>
  );
}

function ModCard({ mod }: { mod: Mod }) {
  return (
    <Link
      href={`/mod/${mod.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
    >
      <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
        {mod.icon_url ? (
          <Avatar className="h-9 w-9 rounded-md">
            <AvatarImage
              src={mod.icon_url}
              alt={mod.name}
              className="object-cover"
            />
            <AvatarFallback className="rounded-md text-sm font-semibold">
              {mod.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
            {mod.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm leading-tight font-semibold group-hover:text-primary">
            {mod.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            by {mod.owner.name}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-3">
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
          {mod.description ?? 'No description provided.'}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpenIcon className="h-3.5 w-3.5" />
            {mod.published_pages_count}{' '}
            {mod.published_pages_count === 1 ? 'page' : 'pages'}
          </span>
          <span>{formatDate(mod.updated_at)}</span>
        </div>
      </div>
    </Link>
  );
}
