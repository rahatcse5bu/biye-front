import './globals.css';
import Providers from './providers';
import {
  DEFAULT_OG_IMAGE,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  toJsonLd,
} from '@/lib/seo';

const siteTitle = 'বিবাহ | বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম';
const siteDescription =
  'বিবাহ একটি বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে পাত্র-পাত্রীরা বায়োডাটা তৈরি করতে এবং পছন্দের জীবনসঙ্গী খুঁজতে পারেন।';

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
    template: `%s | ${SITE_NAME}`,
  },
  description: siteDescription,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  category: 'matrimony',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: siteTitle,
    description: siteDescription,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: '/fav.svg',
    apple: '/logo-192.png',
  },
};

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ['বিবাহ', 'Bibaho', 'Biye'],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-512.png`,
        width: 512,
        height: 512,
      },
      image: DEFAULT_OG_IMAGE.url,
      description:
        'বিবাহ একটি বাংলাদেশী ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে পাত্র-পাত্রীরা বায়োডাটা তৈরি করতে এবং পছন্দের জীবনসঙ্গী খুঁজতে পারেন।',
      email: 'mailto:bibahosupport@gmail.com',
      telephone: '+8801793278360',
      areaServed: {
        '@type': 'Country',
        name: 'Bangladesh',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+8801793278360',
        email: 'bibahosupport@gmail.com',
        contactType: 'customer support',
        areaServed: 'BD',
        availableLanguage: ['Bengali', 'English'],
      },
      sameAs: [
        'https://www.facebook.com/profile.php?id=61551063894495',
        'https://www.linkedin.com/showcase/pnc-nikah/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: ['বিবাহ', 'Bibaho', 'বিয়ে ম্যাট্রিমনি'],
      description: siteDescription,
      inLanguage: 'bn-BD',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
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
            __html: toJsonLd(siteSchema),
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
