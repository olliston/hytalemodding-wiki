import hljs from 'highlight.js';
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import 'highlight.js/styles/github-dark.css';
import { useEffect, useState } from 'react';

interface MarkdownRendererProps {
  content: string;
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

export default function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const parseContent = async () => {
      const html = await marked.parse(content);
      setHtmlContent(html);
    };

    parseContent();
  }, [content]);

  return (
    <div
      className={`prose max-w-none prose-slate dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
