import { SITE_URL } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/biodata/unverified/',
          '/error-page',
          '/forgot-password',
          '/login',
          '/pay',
          '/refund/',
          '/reports',
          '/send-form',
          '/signup',
          '/user/account/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,

  };
}
