import { SITE_NAME } from '@/lib/seo';

export default function manifest() {
  return {
    name: `${SITE_NAME} — বাংলাদেশি ম্যাট্রিমনি`,
    short_name: SITE_NAME,
    description:
      'বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম — বায়োডাটা তৈরি করুন ও পছন্দের জীবনসঙ্গী খুঁজুন।',
    lang: 'bn-BD',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F9F9',
    theme_color: '#0D7377',
    icons: [
      { src: '/logo-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
