import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'অনলাইনে ম্যাট্রিমনি বায়োডাটা তৈরি করুন',
  description:
    'বিয়ে ম্যাট্রিমনিতে ধাপে ধাপে আপনার বায়োডাটা তৈরি ও জমা দিয়ে জীবনসঙ্গী খোঁজা শুরু করুন।',
  path: '/biodata-submit',
});

export default function BiodataSubmitLayout({ children }) {
  return children;
}
