import { backendUrl } from '@/lib/backendUrl';
import { SITE_URL } from '@/lib/seo';
import { fetchBlogPosts } from '@/lib/blog';

const STATIC_ROUTES = [
  { path: '', changeFrequency: 'daily', priority: 1 },
  { path: '/biodatas', changeFrequency: 'daily', priority: 0.9 },
  { path: '/biodata-submit', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/points-package', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/about-us', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact-us', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/refund-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-and-condition', changeFrequency: 'yearly', priority: 0.3 },
];

const PAGE_SIZE = 100;
// TODO: caps backend calls per sitemap build at 5,000 profiles; split into a sitemap index past that.
const MAX_PAGES = 50;

const fetchBiodataEntries = async () => {
  const entries = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
      user_status: 'active',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    const response = await fetch(`${backendUrl}/general-info?${query}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) break;

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : [];

    rows.forEach((row) => {
      if (!/^\d+$/.test(String(row?.user_id ?? ''))) return;
      entries.push({
        url: `${SITE_URL}/biodata/${row.user_id}`,
        lastModified: row.createdAt ? new Date(row.createdAt) : undefined,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });

    if (rows.length < PAGE_SIZE || entries.length >= (payload?.size ?? 0)) break;
  }

  return entries;
};

const fetchBlogEntries = async () => {
  const { posts } = await fetchBlogPosts(1, 50);
  return posts.map((post) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: post.published_at ? new Date(post.published_at) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
};

export const getSitemapEntries = async () => {
  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));

  // TODO: a backend outage must not 500 the sitemap; fall back to static routes.
  const biodataEntries = await fetchBiodataEntries().catch((error) => {
    console.error('Sitemap biodata fetch failed', error);
    return [];
  });

  const blogEntries = await fetchBlogEntries().catch((error) => {
    console.error('Sitemap blog fetch failed', error);
    return [];
  });

  return [...staticEntries, ...blogEntries, ...biodataEntries];
};
