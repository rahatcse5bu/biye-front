import { SITE_URL } from '@/lib/seo';

const PRIVATE_PATHS = [
  '/admin/',
  '/api/',
  '/biodata/unverified/',
  '/error-page',
  '/pay',
  '/refund/',
  '/reports',
  '/send-form',
  '/user/account/',
];

// TODO: named so audits see AI crawlers explicitly allowed; same rules as everyone else.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: AI_CRAWLERS, allow: ['/', '/llms.txt'], disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap-v2.xml`,
  };
}
