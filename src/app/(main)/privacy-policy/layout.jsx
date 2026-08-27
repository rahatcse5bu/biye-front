import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিয়ে ম্যাট্রিমনির গোপনীয়তা নীতিমালা',
  description:
    'বিয়ে ম্যাট্রিমনি কীভাবে ব্যবহারকারীর তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখে সে সম্পর্কে জানুন।',
  path: '/privacy-policy',
});

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
