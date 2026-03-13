import { Head, Link, usePage } from '@inertiajs/react';
import {
  ArrowRight,
  BookOpen,
  FolderKanban,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import HytaleModdingLogo from '@/components/hytale-modding-logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserMenuContent } from '@/components/user-menu-content';
import { dashboard, home, login, register } from '@/routes';
import mods from '@/routes/mods';
import type { SharedData } from '@/types';
import AppFooter from '@/components/app-footer';

const featureCards: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: 'Build clear documentation',
    description:
      'Create rich wiki pages for installation steps, APIs, guides, and changelogs.',
    icon: BookOpen,
  },
  {
    title: 'Organize by project',
    description:
      'Keep each mod in its own workspace with pages, collaborators, and visibility controls.',
    icon: FolderKanban,
  },
  {
    title: 'Collaborate with your team',
    description:
      'Invite contributors, review updates together, and keep docs current as your mod evolves.',
    icon: Users,
  },
];

const workflowSteps: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: 'Create a mod workspace',
    description: 'Set up your project and define who can contribute.',
    icon: Rocket,
  },
  {
    title: 'Write and structure pages',
    description: 'Document systems, commands, setup, and gameplay loops.',
    icon: Sparkles,
  },
  {
    title: 'Publish with confidence',
    description: 'Share polished docs that are easy for your community to navigate.',
    icon: ShieldCheck,
  },
];

export default function Welcome({
  canRegister = true,
}: {
  canRegister?: boolean;
}) {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Welcome" />

      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <nav className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-8">
            <Link
              href={home()}
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <HytaleModdingLogo variant="icon" size="md" />
              <span className="text-lg font-semibold tracking-tight">
                HytaleModding
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {auth.user ? (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link href={dashboard()}>Dashboard</Link>
                  </Button>
                  <UserMenuContent />
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={login()}>Log In</Link>
                  </Button>
                  {canRegister && (
                    <Button asChild size="sm">
                      <Link href={register()}>Register</Link>
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="absolute inset-0 z-0 h-96 overflow-hidden bg-linear-to-br from-primary/10 via-purple-500/5 to-pink-500/10 mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]">
          <div className="animate-blob absolute -top-4 -left-4 h-72 w-72 rounded-full bg-purple-500/15 mix-blend-multiply blur-3xl filter dark:mix-blend-normal" />
          <div className="animation-delay-2000 animate-blob absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 mix-blend-multiply blur-3xl filter dark:mix-blend-normal" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 py-10 md:px-8 md:py-14">
          <section className="space-y-6">
            <div className="space-y-4 pt-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                Your home for Hytale mod documentation
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Create mod wikis, write better guides, and collaborate with your
                team in one clean workspace.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {auth.user ? (
                <>
                  <Button asChild size="lg">
                    <Link href={dashboard()}>
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href={mods.index()}>Browse Mods</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link href={login()}>Log In</Link>
                  </Button>
                  {canRegister && (
                    <Button asChild variant="outline" size="lg">
                      <Link href={register()}>Create Account</Link>
                    </Button>
                  )}
                </>
              )}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {featureCards.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="border-border/60 bg-card/70 backdrop-blur">
                <CardHeader className="space-y-3">
                  <div className="w-fit rounded-md bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            {workflowSteps.map(({ title, description, icon: Icon }, index) => (
              <Card key={title} className="border-border/60">
                <CardContent className="flex items-start gap-4 py-6">
                  <div className="mt-0.5 rounded-md bg-secondary p-2 text-secondary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Step {index + 1}
                    </p>
                    <h2 className="font-semibold">{title}</h2>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="rounded-xl border border-border/60 bg-card/70 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Ready to build your wiki?
                </h2>
                <p className="text-muted-foreground">
                  Start a mod workspace, add your first pages, and share a single
                  source of truth with your contributors and players.
                </p>
              </div>

              {auth.user ? (
                <Button asChild size="lg">
                  <Link href={mods.create()}>
                    Create a New Mod
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link href={login()}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </section>
        </div>
      </div>
    <AppFooter />
    </>
  );
}
