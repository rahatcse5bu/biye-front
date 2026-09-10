import { cookies } from 'next/headers';
import Home from '@/views/pages/Home/Home';
import { createPageMetadata } from '@/lib/seo';
import { religionToApiKey } from '@/constants/religionContent';

export const metadata = createPageMetadata({
  title: 'বিয়ে | বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম',
  description:
    'বিয়ে একটি বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে পাত্র-পাত্রীরা বায়োডাটা তৈরি করতে এবং পছন্দের জীবনসঙ্গী খুঁজতে পারেন।',
  path: '/',
});

export default async function HomePage() {
  const cookieStore = await cookies();
  const religionCookie = cookieStore.get('biye_religion')?.value;
  const initialReligion = religionToApiKey[religionCookie] || null;

  return <Home initialReligion={initialReligion} />;
}
