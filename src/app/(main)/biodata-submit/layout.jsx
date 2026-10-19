import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'অনলাইনে ম্যাট্রিমনি বায়োডাটা তৈরি করুন',
  description:
    'বিবাহ ম্যাট্রিমনিতে ধাপে ধাপে আপনার বায়োডাটা তৈরি ও জমা দিয়ে জীবনসঙ্গী খোঁজা শুরু করুন।',
  path: '/biodata-submit',
  keywords: ['বিয়ের বায়োডাটা তৈরি', 'বায়োডাটা ফরম্যাট', 'অনলাইন বায়োডাটা', 'ম্যাট্রিমনি বায়োডাটা'],
});

export default function BiodataSubmitLayout({ children }) {
  return children;
}
