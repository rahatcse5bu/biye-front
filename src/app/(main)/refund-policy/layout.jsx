import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিয়ে ম্যাট্রিমনির রিফান্ড নীতিমালা',
  description:
    'বিয়ে ম্যাট্রিমনি প্ল্যাটফর্মের পেমেন্ট রিফান্ডের যোগ্যতা, শর্ত এবং আবেদন প্রক্রিয়া সম্পর্কে জানুন।',
  path: '/refund-policy',
});

export default function RefundPolicyLayout({ children }) {
  return children;
}
