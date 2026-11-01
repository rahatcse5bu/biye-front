import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিবাহ ম্যাট্রিমনি পয়েন্ট ও পেমেন্ট প্যাকেজ',
  description:
    'বিকাশে পয়েন্ট কিনে পছন্দের পাত্র-পাত্রীর অভিভাবকের যোগাযোগ তথ্য নিন। অনুরোধে ৩০ ও অ্যাপ্রুভ হলে যোগাযোগ তথ্যে ৭০ পয়েন্ট। সব প্যাকেজের দাম দেখুন।',
  path: '/points-package',
});

export default function PointsPackageLayout({ children }) {
  return children;
}
