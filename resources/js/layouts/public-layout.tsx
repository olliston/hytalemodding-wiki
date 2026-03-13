import { Toaster } from 'sileo';

import AppNavbar from '@/components/app-navbar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import ModNavbar from '@/components/mod-navbar';
import PublicFooter from '@/components/public-footer';

import type { BreadcrumbItem } from '@/types';

interface PublicLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  modName?: string;
  modSlug?: string;
  modIconUrl?: string;
}

export default function PublicLayout({
  children,
  breadcrumbs = [],
  modName,
  modSlug,
  modIconUrl,
}: PublicLayoutProps) {
  const enhancedBreadcrumbs: BreadcrumbItem[] = [
    { title: 'Docs', href: '/docs' },
    ...(modName && modSlug
      ? [{ title: modName, href: `/mod/${modSlug}` }]
      : []),
    ...breadcrumbs,
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {modName && modSlug ? (
        <ModNavbar
          modName={modName}
          modSlug={modSlug}
          modIconUrl={modIconUrl}
        />
      ) : (
        <AppNavbar brandHref="/" />
      )}

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        {enhancedBreadcrumbs && enhancedBreadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumbs breadcrumbs={enhancedBreadcrumbs} />
          </div>
        )}
        {children}
      </main>
      <PublicFooter />
      <Toaster theme="light" position="top-right" />
    </div>
  );
}
