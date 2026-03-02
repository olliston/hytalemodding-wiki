import { AlertTriangle } from 'lucide-react';

export default function WIPBanner() {
  return (
    <div className="w-full bg-yellow-900 px-4 py-2 text-center">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-sm font-medium text-yellow-300">
        <AlertTriangle className="h-4 w-4" />
        <span>
          This application is under WIP. You may find bugs and issues, please
          report them on{' '}
          <a href="https://discord.gg/hytalemodding">our Discord</a> or{' '}
          <a href="https://github.com/HytaleModding/wiki">our GitHub</a>.
        </span>
      </div>
    </div>
  );
}
