import { Head, useForm } from '@inertiajs/react';
import { ChevronRightIcon, PencilIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { getVisibilityColor, visibilityOptions } from '@/utils/commonUtils';

interface Mod {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_url?: string;
  visibility: 'public' | 'private' | 'unlisted';
  storage_driver: 'local';
  external_access: boolean;
  github_repository_url?: string | null;
  github_repository_path?: string | null;
}

interface Props {
  mod: Mod;
}

export default function EditMod({ mod }: Props) {
  const [iconPreview, setIconPreview] = useState<string | null>(
    mod.icon_url || null,
  );

  const { data, setData, patch, processing, errors } = useForm({
    name: mod.name,
    description: mod.description || '',
    visibility: mod.visibility,
    storage_driver: mod.storage_driver,
    external_access: mod.external_access || false,
    github_repository_url: mod.github_repository_url || '',
    github_repository_path: mod.github_repository_path || '',
    icon: null as File | null,
  });

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('icon', file);
      const reader = new FileReader();
      reader.onload = (e) => setIconPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setData('icon', null);
      setIconPreview(mod.icon_url || null);
    }
  };

  const removeIcon = () => {
    setData('icon', null);
    setIconPreview(null);
    const fileInput = document.getElementById('icon') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const submit = (e: React.SubmitEvent) => {
    e.preventDefault();
    patch(`/dashboard/mods/${mod.slug}`, {
      forceFormData: true,
    });
  };

  const deleteMod = () => {
    fetch(`/dashboard/mods/${mod.slug}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN':
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') || '',
      },
    }).then(() => {
      window.location.href = '/dashboard/mods';
    });
  };

  return (
    <AppLayout>
      <Head title={`Edit ${mod.name}`} />

      <div className="space-y-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 text-sm text-primary">
            <a href={`/dashboard/mods/${mod.slug}`} className="hover:underline">
              {mod.name}
            </a>
            <ChevronRightIcon className="m-1 inline h-4 w-4" />
            <span>Settings</span>
          </nav>
        </div>

        <form onSubmit={submit} className="mt-12 space-y-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center space-x-3">
                  <div className="group relative flex-1">
                    <Label htmlFor="name" className="sr-only">
                      Mod Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="My Awesome Mod"
                      className={cn(
                        'h-auto w-full border-2 border-muted-foreground/30 px-3 py-2 text-3xl font-bold tracking-tight hover:border-muted-foreground/50 focus:border-primary',
                        errors.name ? 'border-destructive' : '',
                      )}
                    />
                    <PencilIcon className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="group relative mb-4">
                  <Label htmlFor="description" className="sr-only">
                    Description
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="A brief description of what your mod does..."
                      rows={2}
                      className={cn(
                        'w-full resize-none border-2 border-muted-foreground/30 px-3 py-2 text-muted-foreground hover:border-muted-foreground/50 focus:border-primary',
                        errors.description ? 'border-destructive' : '',
                      )}
                    />
                    <PencilIcon className="absolute top-3 right-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <Card className="bg-transparent">
                <CardHeader>
                  <CardTitle>Additional Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="visibility">Visibility</Label>
                    <Select
                      value={data.visibility}
                      onValueChange={(
                        value: 'public' | 'unlisted' | 'private',
                      ) => setData('visibility', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {visibilityOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="flex w-full"
                          >
                            <div className="flex w-full items-center justify-between gap-4">
                              <Badge
                                variant="outline"
                                className={getVisibilityColor(option.value)}
                              >
                                {option.label}
                              </Badge>
                              <div className="text-sm text-muted-foreground">
                                {option.description}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.visibility && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.visibility}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-muted-foreground">
                      Control who can access your mod documentation
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="icon">Mod Icon</Label>
                    <div className="relative mt-2">
                      <Input
                        id="icon"
                        type="file"
                        accept="image/*"
                        onChange={handleIconChange}
                        className={cn(
                          'pr-10',
                          errors.icon ? 'border-destructive' : '',
                        )}
                      />
                      {(iconPreview || data.icon) && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="hover:text-destructive-foreground absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 hover:bg-muted"
                          onClick={removeIcon}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {iconPreview && (
                      <div className="mt-4 flex justify-center">
                        <img
                          src={iconPreview}
                          alt="Icon preview"
                          className="h-24 w-24 rounded-lg border object-cover"
                        />
                      </div>
                    )}
                    {errors.icon && (
                      <p className="mt-2 text-sm text-destructive">
                        {errors.icon}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-muted-foreground">
                      Optional. Upload a square image (PNG, JPG, GIF, WebP).
                      Maximum size: 2MB.
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="github_repository_url">
                        GitHub Repository URL
                      </Label>
                      <Input
                        id="github_repository_url"
                        type="url"
                        value={data.github_repository_url}
                        onChange={(e) =>
                          setData('github_repository_url', e.target.value)
                        }
                        placeholder="https://github.com/owner/repository"
                        className={cn(
                          errors.github_repository_url
                            ? 'border-destructive'
                            : '',
                        )}
                      />
                      {errors.github_repository_url && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.github_repository_url}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="github_repository_path">
                        Repository Path
                      </Label>
                      <Input
                        id="github_repository_path"
                        type="text"
                        value={data.github_repository_path}
                        onChange={(e) =>
                          setData('github_repository_path', e.target.value)
                        }
                        placeholder="docs"
                        className={cn(
                          errors.github_repository_path
                            ? 'border-destructive'
                            : '',
                        )}
                      />
                      {errors.github_repository_path && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.github_repository_path}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-muted-foreground">
                        Optional subfolder to sync markdown from (for example:
                        docs/guides). Leave blank to sync the repository root.
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      When a GitHub URL is configured, pages are managed by sync
                      and manual page create/edit is disabled.
                    </p>
                  </div>

                  <Separator />
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="external_access"
                      checked={data.external_access}
                      onCheckedChange={(checked: boolean) =>
                        setData('external_access', checked)
                      }
                    />
                    <div>
                      <Label htmlFor="external_access">External Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow external applications to access this mod via API
                      </p>
                    </div>
                    {errors.external_access && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.external_access}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end space-x-3 border-t pt-6">
              <Button type="button" variant="outline" asChild>
                <a href={`/dashboard/mods/${mod.slug}`}>Cancel</a>
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </form>

        <div className="mx-auto mt-16 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-4">
                <div>
                  <h3 className="text-lg font-medium">Delete Mod</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete this mod and all its content. This action
                    cannot be undone.
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="destructive">
                      Delete Mod Permanently
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this mod? This will
                        permanently delete all pages, files, and collaborator
                        access. This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="destructive" onClick={deleteMod}>
                        Confirm deletion
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
