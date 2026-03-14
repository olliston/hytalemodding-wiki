import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { CheckIcon, LinkIcon } from 'lucide-react';
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import 'highlight.js/styles/github-dark.css';
import { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

interface MarkdownRendererProps {
  content: string | null | undefined;
  className?: string;
}

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;

  return `<pre class="hljs-code-block"><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

renderer.codespan = function ({ text }: { text: string }) {
  return `<code class="inline-code">${text}</code>`;
};

marked.use(gfmHeadingId(), markedFootnote(), { renderer });

marked.setOptions({
  gfm: true,
  breaks: true,
});

const CLIPBOARD_ICON_SVG = renderToStaticMarkup(
  <LinkIcon size={16} aria-hidden="true" />,
);
const CHECK_ICON_SVG = renderToStaticMarkup(
  <CheckIcon size={16} aria-hidden="true" />,
);

function addHeadingAnchors(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const id = heading.id;
    if (!id) return;

    heading.classList.add('heading-with-link');

    // Wrap existing inline content in a span so flex layout works correctly
    const contentSpan = doc.createElement('span');
    while (heading.firstChild) {
      contentSpan.appendChild(heading.firstChild);
    }
    heading.appendChild(contentSpan);

    const headingText = contentSpan.textContent ?? '';

    const copyBtn = doc.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'copy-heading-btn';
    copyBtn.setAttribute('data-heading-id', id);
    copyBtn.setAttribute('aria-label', `Copy link to "${headingText}"`);
    copyBtn.innerHTML = CLIPBOARD_ICON_SVG;
    heading.appendChild(copyBtn);
  });

  return doc.body.innerHTML;
}

export default function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const safeContent = content ?? '';

  useEffect(() => {
    const parseContent = async () => {
      const html = await marked.parse(safeContent);
      const sanitized = DOMPurify.sanitize(html);
      setHtmlContent(addHeadingAnchors(sanitized));
    };

    parseContent();
  }, [safeContent]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const btn = (e.target as Element).closest(
        '.copy-heading-btn',
      ) as HTMLElement | null;
      if (!btn) return;

      const headingId = btn.getAttribute('data-heading-id');
      if (!headingId) return;

      const url = `${window.location.origin}${window.location.pathname}#${headingId}`;
      navigator.clipboard.writeText(url).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = CHECK_ICON_SVG;
        setTimeout(() => {
          btn.innerHTML = original;
        }, 1500);
      });
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className={`prose max-w-none prose-slate dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
