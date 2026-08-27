import { Suspense } from 'react';
import './globals.css';
import Providers from './providers';
import { SITE_URL } from '@/lib/seo';

const siteTitle = 'বিয়ে | বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম';
const siteDescription =
  'বিয়ে একটি বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে পাত্র-পাত্রীরা বায়োডাটা তৈরি করতে এবং পছন্দের জীবনসঙ্গী খুঁজতে পারেন।';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0D7377',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: '%s | বিয়ে',
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: SITE_URL,
    siteName: 'বিয়ে',
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: '/fav.svg',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'বিয়ে',
  alternateName: 'Biye',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/assets/logo/biye-logo.svg`,
  },
  description:
    'বিয়ে একটি বাংলাদেশী ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে পাত্র-পাত্রীরা বায়োডাটা তৈরি করতে এবং পছন্দের জীবনসঙ্গী খুঁজতে পারেন।',
  email: 'mailto:pnc.nikah@gmail.com',
  telephone: '+8801793278360',
  areaServed: {
    '@type': 'Country',
    name: 'Bangladesh',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+8801793278360',
    contactType: 'customer support',
    areaServed: 'BD',
    availableLanguage: 'Bengali',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61551063894495',
    'https://www.linkedin.com/showcase/pnc-nikah/',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn-BD">
      <head>
        <link
          href="https://fonts.maateen.me/bangla/font.css"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
          }}
        />
        <Providers>
          <Suspense fallback={null}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
