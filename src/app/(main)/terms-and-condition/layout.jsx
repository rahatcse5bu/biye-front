import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিয়ে ম্যাট্রিমনি ব্যবহারের শর্তাবলি',
  description:
    'বিয়ে ম্যাট্রিমনি প্ল্যাটফর্ম ব্যবহার, অ্যাকাউন্ট, বায়োডাটা এবং সেবা গ্রহণের প্রযোজ্য শর্তাবলি পড়ুন।',
  path: '/terms-and-condition',
});

export default function TermsAndConditionLayout({ children }) {
  return children;
}
