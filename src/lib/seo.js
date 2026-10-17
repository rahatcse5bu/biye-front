const DEFAULT_SITE_URL = 'https://www.bibaho.org';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/+$/, '');

export const SITE_HOST = new URL(SITE_URL).host;

export const SITE_NAME = 'বিয়ে';

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'বিয়ে — বিশ্বস্ত বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম',
};

export const SITE_KEYWORDS = [
  'বিয়ে',
  'বিবাহ',
  'Bibaho',
  'বাংলাদেশি ম্যাট্রিমনি',
  'ইসলামিক ম্যাট্রিমনি',
  'হিন্দু ম্যাট্রিমনি',
  'খ্রিস্টান ম্যাট্রিমনি',
  'পাত্র পাত্রী',
  'পাত্রী চাই',
  'পাত্র চাই',
  'বিয়ের বায়োডাটা',
  'বায়োডাটা',
  'জীবনসঙ্গী',
  'Bangladeshi matrimony',
  'Bangladeshi marriage site',
  'biodata for marriage',
];

// TODO: JSON-LD goes through dangerouslySetInnerHTML, so escape `<` to block </script> breakouts.
export const toJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

export const createPageMetadata = ({ title, description, path, keywords, images }) => {
  const normalizedPath = path === '/' ? '' : path;
  const url = `${SITE_URL}${normalizedPath}`;
  const ogImages = images?.length ? images : [DEFAULT_OG_IMAGE];

  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    ...(keywords?.length && { keywords }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'bn_BD',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
};

export const createBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(({ name, path }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: `${SITE_URL}${path === '/' ? '' : path}`,
  })),
});

export const NO_INDEX_FOLLOW_METADATA = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

export const NO_INDEX_METADATA = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};
