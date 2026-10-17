import { getSitemapEntries } from '@/lib/sitemap';

export const revalidate = 3600;

export default function sitemap() {
  return getSitemapEntries();
}
