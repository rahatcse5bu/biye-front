import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিবাহ ম্যাট্রিমনির সঙ্গে যোগাযোগ করুন',
  description:
    'বায়োডাটা, পয়েন্ট, পেমেন্ট বা রিফান্ড নিয়ে প্রশ্ন? ইমেইল bibahosupport@gmail.com বা ফোন +৮৮০১৭৯৩২৭৮৩৬০ — বিবাহ সাপোর্ট টিম দ্রুত সাহায্য করবে।',
  path: '/contact-us',
});

export default function ContactUsLayout({ children }) {
  return children;
}
