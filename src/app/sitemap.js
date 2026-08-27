import { SITE_URL } from '@/lib/seo';

const publicRoutes = [
  { path: '', changeFrequency: 'daily', priority: 1 },
  { path: '/biodatas', changeFrequency: 'daily', priority: 0.9 },
  { path: '/biodata-submit', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/points-package', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about-us', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact-us', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/refund-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-and-condition', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap() {
  return publicRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
