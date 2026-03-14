import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { Head, useForm } from '@inertiajs/react';
import {
  ChevronRightIcon,
  ExternalLinkIcon,
  Loader2Icon,
  RotateCcwIcon,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

interface Mod {
  id: string;
  name: string;
  slug: string;
  custom_css?: string | null;
}

interface Props {
  mod: Mod;
}

const STARTER_CSS = `/* ✨ Custom styles for ${'{mod}'} */

/* Example: change heading colors */
/* .prose h1, .prose h2 {
  color: oklch(0.7 0.2 250);
} */

/* Example: custom card background */
/* .card {
  background: linear-gradient(135deg, #1e1b4b, #312e81) !important;
  border-color: #4338ca !important;
} */

/* Example: custom accent color */
/* :root {
  --primary: oklch(0.65 0.25 260);
  --primary-foreground: oklch(0.98 0 0);
} */
`;

export default function CssEditor({ mod }: Props) {
  const [savedCss, setSavedCss] = useState(mod.custom_css ?? '');
  const [previewVisible, setPreviewVisible] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  const { data, setData, patch, processing, errors } = useForm({
    custom_css: mod.custom_css ?? '',
  });

  // Inject/update CSS in the iframe preview
  const injectCss = useCallback(
    (cssText: string) => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentDocument) return;
      let styleEl = iframe.contentDocument.getElementById(
        'preview-custom-css',
      ) as HTMLStyleElement | null;
      if (!styleEl) {
        styleEl = iframe.contentDocument.createElement('style');
        styleEl.id = 'preview-custom-css';
        iframe.contentDocument.head.appendChild(styleEl);
      }
      styleEl.textContent = cssText;
    },
    [],
  );

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
    injectCss(data.custom_css);
  }, [data.custom_css, injectCss]);

  // Re-inject whenever CSS changes (debounced slightly)
  useEffect(() => {
    if (!iframeLoaded) return;
    const timer = setTimeout(() => injectCss(data.custom_css), 150);
    return () => clearTimeout(timer);
  }, [data.custom_css, iframeLoaded, injectCss]);

  const handleSave = () => {
    patch(`/dashboard/mods/${mod.slug}/css`, {
      preserveScroll: true,
      onSuccess: () => {
        setSavedCss(data.custom_css);
      },
    });
  };

  const handleReset = () => {
    if (
      window.confirm('Reset to the last saved CSS? Unsaved changes will be lost.')
    ) {
      setData('custom_css', savedCss);
    }
  };

  const handleInsertStarter = () => {
    if (
      data.custom_css.trim() === '' ||
      window.confirm('Replace current CSS with the starter template?')
    ) {
      setData('custom_css', STARTER_CSS.replace('{mod}', mod.name));
    }
  };

  const isDirty = data.custom_css !== savedCss;

  return (
    <AppLayout contentWidth="full">
      <Head title={`CSS Editor — ${mod.name}`} />
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <nav className="mb-2 flex items-center text-sm text-muted-foreground">
              <a href={`/dashboard/mods/${mod.slug}`} className="hover:text-foreground">
                {mod.name}
              </a>
              <ChevronRightIcon className="mx-1 h-4 w-4" />
              <a
                href={`/dashboard/mods/${mod.slug}/edit`}
                className="hover:text-foreground"
              >
                Settings
              </a>
              <ChevronRightIcon className="mx-1 h-4 w-4" />
              <span className="text-foreground">CSS Editor</span>
            </nav>
            <h1 className="text-2xl font-semibold">CSS Editor</h1>
            <p className="text-sm text-muted-foreground">
              Customize how your mod&apos;s public pages look.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={handleInsertStarter}>
              Insert Starter CSS
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={!isDirty || processing}
            >
              <RotateCcwIcon className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={() => setPreviewVisible((v) => !v)}
            >
              {previewVisible ? 'Hide Preview' : 'Show Preview'}
            </Button>
            <Button onClick={handleSave} disabled={processing || !isDirty}>
              {processing && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>custom.css</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeMirror
                ref={editorRef}
                value={data.custom_css}
                onChange={(nextValue) => setData('custom_css', nextValue)}
                extensions={[css()]}
                theme={oneDark}
                style={{ minHeight: '520px', fontSize: '13px' }}
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: true,
                  highlightActiveLine: true,
                  indentOnInput: true,
                }}
                placeholder="/* Write your custom CSS here... */"
              />
              {errors.custom_css && (
                <p className="text-sm text-destructive">{errors.custom_css}</p>
              )}
              <div className="text-xs text-muted-foreground">
                {data.custom_css.length.toLocaleString()} characters
                {isDirty && <span className="ml-2 text-amber-600">Unsaved changes</span>}
              </div>
            </CardContent>
          </Card>

          {previewVisible && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Live Preview</span>
                  <a
                    href={`/mod/${mod.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-normal text-muted-foreground hover:text-foreground"
                  >
                    Open Public Page
                    <ExternalLinkIcon className="ml-1 h-3.5 w-3.5" />
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-hidden rounded-md border bg-background">
                  {!iframeLoaded && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/95">
                      <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  )}
                  <iframe
                    ref={iframeRef}
                    src={`/mod/${mod.slug}`}
                    className="h-[560px] w-full border-none"
                    onLoad={handleIframeLoad}
                    title="Live preview"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}






