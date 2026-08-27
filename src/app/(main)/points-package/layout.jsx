import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিয়ে ম্যাট্রিমনি পয়েন্ট ও পেমেন্ট প্যাকেজ',
  description:
    'বিয়ে ম্যাট্রিমনির যোগাযোগ সুবিধার জন্য উপলভ্য পয়েন্ট ও পেমেন্ট প্যাকেজের তথ্য দেখুন।',
  path: '/points-package',
});

export default function PointsPackageLayout({ children }) {
  return children;
}
