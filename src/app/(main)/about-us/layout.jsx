import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিয়ে বাংলাদেশি ম্যাট্রিমনি সম্পর্কে',
  description:
    'বাংলাদেশি পাত্র-পাত্রীদের সহজে বায়োডাটা তৈরি ও পছন্দের জীবনসঙ্গী খুঁজতে সহায়তা করা বিয়ে ম্যাট্রিমনি সম্পর্কে জানুন।',
  path: '/about-us',
});

export default function AboutUsLayout({ children }) {
  return children;
}
