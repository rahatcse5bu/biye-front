import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বাংলাদেশি পাত্র-পাত্রীর সকল বায়োডাটা',
  description:
    'বাংলাদেশি পাত্র-পাত্রীর বায়োডাটা দেখুন এবং পছন্দ, এলাকা ও বৈবাহিক অবস্থা অনুযায়ী জীবনসঙ্গী খুঁজুন।',
  path: '/biodatas',
});

export default function BiodatasLayout({ children }) {
  return children;
}
