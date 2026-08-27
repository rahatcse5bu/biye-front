import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিয়ে ম্যাট্রিমনি সম্পর্কে সাধারণ জিজ্ঞাসা',
  description:
    'বিয়ে ম্যাট্রিমনিতে অ্যাকাউন্ট, বায়োডাটা, যোগাযোগ, পেমেন্ট এবং নিরাপত্তা সম্পর্কিত সাধারণ প্রশ্নের উত্তর দেখুন।',
  path: '/faq',
});

export default function FaqLayout({ children }) {
  return children;
}
