import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিয়ে ম্যাট্রিমনির সঙ্গে যোগাযোগ করুন',
  description:
    'বিয়ে ম্যাট্রিমনি সম্পর্কে সহায়তা, প্রশ্ন বা মতামতের জন্য আমাদের সঙ্গে যোগাযোগ করুন।',
  path: '/contact-us',
});

export default function ContactUsLayout({ children }) {
  return children;
}
