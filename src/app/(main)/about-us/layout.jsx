import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'বিবাহ বাংলাদেশি ম্যাট্রিমনি সম্পর্কে',
  description:
    'মুসলিম, হিন্দু ও খ্রিস্টান পাত্র-পাত্রীদের জন্য বাংলাদেশি ম্যাট্রিমনি বিবাহ সম্পর্কে জানুন: বিনামূল্যে বায়োডাটা তৈরি, যাচাইকৃত বায়োডাটা ও অভিভাবকের মাধ্যমে নিরাপদ যোগাযোগ।',
  path: '/about-us',
});

export default function AboutUsLayout({ children }) {
  return children;
}
