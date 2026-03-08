import { Head, useForm, router } from '@inertiajs/react';
import { ChevronRightIcon } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

// ============================================================================
// Type Definitions
// ============================================================================

interface Mod {
  id: string;
  name: string;
  slug: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  is_index: boolean;
  published: boolean;
  parent_id?: string;
}

interface PotentialParent {
  id: string;
  title: string;
  slug: string;
}

interface Props {
  mod: Mod;
  page: Page;
  potentialParents: PotentialParent[];
}

const MIN_EDITOR_LINES = 30;
const EDITOR_MIN_HEIGHT = 'calc(100vh - 280px)';

// Reusable Tailwind class patterns
const CARD_CLASSES =
  'border-border/40 bg-card/50 overflow-hidden flex flex-col';
const CARD_HEADER_CLASSES =
  'border-b border-border/40 bg-muted/30 px-4 py-3 flex-shrink-0';
const CARD_TITLE_CLASSES = 'text-sm font-semibold text-muted-foreground';
const TOGGLE_BUTTON_CLASSES = 'h-7 text-xs';

export default function EditPage({ mod, page, potentialParents }: Props) {
  // Form state management
  const { data, setData, patch, processing, errors } = useForm({
    title: page.title,
    content: page.content,
    parent_id: page.parent_id || '',
    is_index: page.is_index,
    published: page.published,
  });

  // View state management
  const [showPreview, setShowPreview] = useState(false);
  const [showEditor, setShowEditor] = useState(true);

  // Memoized values
  const lineCount = useMemo(
    () => Math.max(data.content.split('\n').length, MIN_EDITOR_LINES),
    [data.content],
  );

  const isInSplitView = showEditor && showPreview;
  const pageUrl = `/dashboard/mods/${mod.slug}/pages/${page.slug}`;
  const modUrl = `/dashboard/mods/${mod.slug}`;

  const handleSubmit = useCallback(
    (e: React.SubmitEvent) => {
      e.preventDefault();
      patch(pageUrl);
    },
    [patch, pageUrl],
  );

  const handleDelete = useCallback(() => {
    if (
      confirm(
        'Are you sure you want to delete this page? This action cannot be undone.',
      )
    ) {
      router.delete(pageUrl);
    }
  }, [pageUrl]);

  const handleSaveAsDraft = useCallback(() => {
    router.patch(pageUrl, { ...data, published: false });
  }, [pageUrl, data]);

  const togglePreview = () => setShowPreview((prev) => !prev);
  const toggleEditor = () => setShowEditor((prev) => !prev);

  return (
    <AppLayout>
      <Head title={`Edit ${page.title} - ${mod.name}`} />

      <div className="mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* ========== Page Header ========== */}
        <header className="mb-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 flex items-center text-sm text-primary">
            <a href={modUrl} className="hover:underline">
              {mod.name}
            </a>
            <ChevronRightIcon className="mx-2 h-4 w-4" />
            <a href={pageUrl} className="hover:underline">
              {page.title}
            </a>
            <ChevronRightIcon className="mx-2 h-4 w-4" />
            <span>Edit</span>
          </nav>

          <h1 className="text-3xl font-bold text-primary">Edit Page</h1>
          <p className="mt-2 text-muted-foreground">
            Update your documentation page content and settings
          </p>
        </header>

        {/* ========== Edit Form ========== */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ========== Page Details Card ========== */}
          <Card className="border-border/40 bg-card/50">
            <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
              <CardTitle className="text-base font-semibold">
                Page Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-6 py-5">
              {/* Title and Parent Fields */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Title Input */}
                <div>
                  <Label htmlFor="title">Page Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Getting Started"
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Parent Page Select */}
                <div>
                  <Label htmlFor="parent_id">Parent Page</Label>
                  <Select
                    value={data.parent_id || 'none'}
                    onValueChange={(value) =>
                      setData('parent_id', value === 'none' ? '' : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="No parent (root page)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        No parent (root page)
                      </SelectItem>
                      {potentialParents.map((parent) => (
                        <SelectItem key={parent.id} value={parent.id}>
                          {parent.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Page Options Checkboxes */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_index"
                    checked={data.is_index}
                    onCheckedChange={(checked) =>
                      setData('is_index', !!checked)
                    }
                  />
                  <Label htmlFor="is_index" className="text-sm">
                    Index page (home page of the mod)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={data.published}
                    onCheckedChange={(checked) =>
                      setData('published', !!checked)
                    }
                  />
                  <Label htmlFor="published" className="text-sm">
                    Published
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor & Preview Section */}
          <div
            className={`grid gap-4 ${isInSplitView ? 'lg:grid-cols-2' : 'grid-cols-1'}`}
          >
            {/* Markdown Editor */}
            {showEditor && (
              <Card
                className={CARD_CLASSES}
                style={{ minHeight: EDITOR_MIN_HEIGHT }}
              >
                <CardHeader className={CARD_HEADER_CLASSES}>
                  <div className="flex items-center justify-between">
                    <CardTitle className={CARD_TITLE_CLASSES}>
                      Content Editor
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowEditor(false);
                          setShowPreview(true);
                        }}
                        className={TOGGLE_BUTTON_CLASSES}
                      >
                        Hide Editor
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={togglePreview}
                        className={TOGGLE_BUTTON_CLASSES}
                      >
                        {showPreview ? 'Hide Preview' : 'Show Preview'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
                  {/* Editor with Line Numbers */}
                  <div className="relative flex flex-1 overflow-hidden">
                    {/* Line Numbers Gutter */}
                    <div className="w-12 shrink-0 overflow-y-auto border-r border-border/40 bg-muted/30">
                      <div className="flex flex-col items-center pt-3 font-mono text-xs text-muted-foreground select-none">
                        {Array.from({ length: lineCount }, (_, i) => (
                          <div key={i + 1} className="h-6 leading-6">
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Markdown Textarea */}
                    <Textarea
                      id="content"
                      value={data.content}
                      rows={lineCount}
                      onChange={(e) => setData('content', e.target.value)}
                      placeholder="# Welcome

Write your content here using Markdown syntax.

## Features

- Feature 1
- Feature 2

```bash
# Example code block
echo 'Hello World'
```"
                      className={`flex-1 resize-none overflow-y-auto rounded-none border-0 bg-background/50 px-4 py-3 font-mono text-sm leading-6 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.content ? 'min-h-screen border-l-2 border-l-destructive' : ''} `}
                    />
                  </div>

                  {/* Editor Footer */}
                  <div className="flex shrink-0 items-center justify-between border-t border-border/40 bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      {errors.content ? (
                        <span className="font-medium text-destructive">
                          {errors.content}
                        </span>
                      ) : (
                        <span>Markdown • {data.content.length} characters</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span>UTF-8</span>
                      <span>•</span>
                      <span>Ln {lineCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Live Preview */}
            {showPreview && (
              <Card
                className={CARD_CLASSES}
                style={{ minHeight: EDITOR_MIN_HEIGHT }}
              >
                <CardHeader className={CARD_HEADER_CLASSES}>
                  <div className="flex items-center justify-between">
                    <CardTitle className={CARD_TITLE_CLASSES}>
                      Live Preview
                    </CardTitle>
                    {!showEditor && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleEditor}
                        className={TOGGLE_BUTTON_CLASSES}
                      >
                        Show Editor
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden p-0">
                  <div className="h-full overflow-y-auto bg-background/50 p-6">
                    <MarkdownRenderer
                      content={data.content || 'Nothing to preview yet...'}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4">
            {/* Destructive Actions */}
            <div className="flex space-x-3">
              <Button type="button" variant="outline" asChild>
                <a href={pageUrl}>Cancel</a>
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Delete Page
              </Button>
            </div>

            {/* Save Actions */}
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveAsDraft}
                disabled={processing}
              >
                {processing ? 'Saving...' : 'Save as Draft'}
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
