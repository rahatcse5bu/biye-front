import { backendUrl } from '@/lib/backendUrl';

// TODO: newly published posts reach the site within this many seconds.
export const BLOG_REVALIDATE = 60;
export const BLOG_PAGE_SIZE = 12;

export const fetchBlogPosts = async (page = 1, limit = BLOG_PAGE_SIZE) => {
  const query = new URLSearchParams({ page: String(page), limit: String(limit) });
  const response = await fetch(`${backendUrl}/blogs?${query}`, {
    next: { revalidate: BLOG_REVALIDATE },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Unable to load blog posts');
  const payload = await response.json();
  return {
    posts: Array.isArray(payload?.data) ? payload.data : [],
    total: payload?.meta?.total ?? 0,
  };
};

export const fetchBlogPost = async (slug) => {
  const response = await fetch(`${backendUrl}/blogs/${encodeURIComponent(slug)}`, {
    next: { revalidate: BLOG_REVALIDATE },
    signal: AbortSignal.timeout(15000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Unable to load blog post ${slug}`);
  const payload = await response.json();
  return payload?.data || null;
};

// TODO: Next may hand over the segment still percent-encoded, so Bangla slugs are decoded once here.
export const decodeSlug = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const formatBlogDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

// TODO: rich-editor posts are HTML (sanitized by the backend); older posts are plain text.
export const isHtmlContent = (content = '') => content.trim().startsWith('<');

const decodeEntities = (text) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

export const blogExcerpt = (post, length = 160) => {
  if (post.excerpt) return post.excerpt;
  const content = post.content || '';
  const text = isHtmlContent(content)
    ? decodeEntities(content.replace(/<\/(p|h2|h3|h4|li|blockquote)>/g, ' ').replace(/<[^>]*>/g, ''))
    : content.replace(/^\s*(##|-)\s+/gm, '');
  const plain = text.replace(/\s+/g, ' ').trim();
  return plain.length > length ? `${plain.slice(0, length).trim()}…` : plain;
};

// TODO: blank line = paragraph, "## " = heading, "- " = bullet; rendered as React nodes so admin text never becomes HTML.
export const parseBlogContent = (content = '') =>
  content
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .flatMap((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      const parts = [];
      let text = [];
      let items = [];
      const flushText = () => {
        if (text.length) parts.push({ type: 'p', lines: text });
        text = [];
      };
      const flushItems = () => {
        if (items.length) parts.push({ type: 'ul', items });
        items = [];
      };
      lines.forEach((line) => {
        if (line.startsWith('## ')) {
          flushText();
          flushItems();
          parts.push({ type: 'h2', text: line.slice(3).trim() });
        } else if (/^[-*]\s+/.test(line)) {
          flushText();
          items.push(line.replace(/^[-*]\s+/, ''));
        } else {
          flushItems();
          text.push(line);
        }
      });
      flushText();
      flushItems();
      return parts;
    });
