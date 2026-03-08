import { useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface MarkdownEditorPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
  lineCount: number;
  error?: string;
}

// Constants
const EDITOR_MIN_HEIGHT = 'calc(100vh - 280px)';
const CARD_CLASSES =
  'border-border/40 bg-card/50 overflow-hidden flex flex-col';
const CARD_HEADER_CLASSES =
  'border-b border-border/40 bg-muted/30 px-4 py-3 shrink-0';
const CARD_TITLE_CLASSES = 'text-sm font-semibold text-muted-foreground';
const TOGGLE_BUTTON_CLASSES = 'h-7 text-xs';

export default function MarkdownEditorPreview({
  content,
  onContentChange,
  lineCount,
  error,
}: MarkdownEditorPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showEditor, setShowEditor] = useState(true);

  const isInSplitView = showEditor && showPreview;

  return (
    <div
      className={`grid gap-4 ${isInSplitView ? 'lg:grid-cols-2' : 'grid-cols-1'}`}
    >
      {/*  Markdown Editor  */}
      {showEditor && (
        <Card className={CARD_CLASSES} style={{ minHeight: EDITOR_MIN_HEIGHT }}>
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
                  onClick={() => setShowPreview((prev) => !prev)}
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
                value={content}
                rows={lineCount}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="# Welcome

Write your content here using Markdown syntax.

## Features

- Feature 1
- Feature 2

```bash
# Example code block
echo 'Hello World'
```"
                className={`flex-1 resize-none overflow-y-auto rounded-none border-0 bg-background/50 px-4 py-3 font-mono text-sm leading-6 focus-visible:ring-0 focus-visible:ring-offset-0 ${error ? 'min-h-screen border-l-2 border-l-destructive' : ''} `}
              />
            </div>

            {/* Editor Footer */}
            <div className="flex shrink-0 items-center justify-between border-t border-border/40 bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                {error ? (
                  <span className="font-medium text-destructive">{error}</span>
                ) : (
                  <span>Markdown • {content.length} characters</span>
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

      {/*  Live Preview  */}
      {showPreview && (
        <Card className={CARD_CLASSES} style={{ minHeight: EDITOR_MIN_HEIGHT }}>
          <CardHeader className={CARD_HEADER_CLASSES}>
            <div className="flex items-center justify-between">
              <CardTitle className={CARD_TITLE_CLASSES}>Live Preview</CardTitle>
              {!showEditor && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEditor(true)}
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
                content={content || 'Nothing to preview yet...'}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
