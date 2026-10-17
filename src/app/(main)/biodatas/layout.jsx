import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বাংলাদেশি পাত্র-পাত্রীর সকল বায়োডাটা',
  description:
    'বাংলাদেশি পাত্র-পাত্রীর বায়োডাটা দেখুন এবং পছন্দ, এলাকা ও বৈবাহিক অবস্থা অনুযায়ী জীবনসঙ্গী খুঁজুন।',
  path: '/biodatas',
  keywords: ['পাত্রী চাই', 'পাত্র চাই', 'পাত্র-পাত্রীর বায়োডাটা', 'বিয়ের বায়োডাটা', 'ইসলামিক পাত্রী', 'বাংলাদেশি ম্যাট্রিমনি'],
});

export default function BiodatasLayout({ children }) {
  return children;
}
