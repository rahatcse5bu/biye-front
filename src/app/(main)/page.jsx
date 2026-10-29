import { cookies } from 'next/headers';
import Home from '@/views/pages/Home/Home';
import { createPageMetadata } from '@/lib/seo';
import { religionToApiKey } from '@/constants/religionContent';
import { backendUrl } from '@/lib/backendUrl';
import { convertToQuery } from '@/utils/query';

export const metadata = createPageMetadata({
  title: 'বিবাহ | বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম',
  description:
    'বিবাহ একটি বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে পাত্র-পাত্রীরা বায়োডাটা তৈরি করতে এবং পছন্দের জীবনসঙ্গী খুঁজতে পারেন।',
  path: '/',
});

// TODO: a failed or slow call returns null so the client query takes over instead of breaking the home page.
const fetchJson = async (path) => {
  try {
    const response = await fetch(`${backendUrl}${path}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload?.success ? payload : null;
  } catch (error) {
    console.error(`Home prefetch failed for ${path}`, error);
    return null;
  }
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const religionCookie = cookieStore.get('biye_religion')?.value;
  const initialReligion = religionToApiKey[religionCookie] || null;

  // TODO: same query the client sends, so crawlers get real featured cards and stats in the HTML.
  const featuredQuery = { isFeatured: true, ...(initialReligion && { religion: initialReligion }) };
  const [initialFeatured, stats] = await Promise.all([
    fetchJson(`/general-info?${convertToQuery(featuredQuery)}`),
    fetchJson('/bio-data/stats'),
  ]);

  return (
    <Home
      initialReligion={initialReligion}
      initialFeatured={Array.isArray(initialFeatured?.data) ? initialFeatured : null}
      initialStats={stats?.data ?? null}
    />
  );
}
