import Home from '@/views/pages/Home/Home';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিয়ে | বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম',
  description:
    'বিয়ে একটি বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে পাত্র-পাত্রীরা বায়োডাটা তৈরি করতে এবং পছন্দের জীবনসঙ্গী খুঁজতে পারেন।',
  path: '/',
});

export default function HomePage() {
  return <Home />;
}
