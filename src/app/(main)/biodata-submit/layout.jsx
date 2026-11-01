import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'অনলাইনে ম্যাট্রিমনি বায়োডাটা তৈরি করুন',
  description:
    'অভিভাবকের সম্মতিতে বিনামূল্যে বিয়ের বায়োডাটা তৈরি করুন। সাধারণ, পারিবারিক, শিক্ষা ও পেশার তথ্য ধাপে ধাপে দিন; ৩-৭ কার্যদিবসে যাচাই শেষে প্রকাশ।',
  path: '/biodata-submit',
  keywords: ['বিয়ের বায়োডাটা তৈরি', 'বায়োডাটা ফরম্যাট', 'অনলাইন বায়োডাটা', 'ম্যাট্রিমনি বায়োডাটা'],
});

export default function BiodataSubmitLayout({ children }) {
  return children;
}
