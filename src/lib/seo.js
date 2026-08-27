const DEFAULT_SITE_URL = 'https://www.biye.info';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/+$/, '');

export const createPageMetadata = ({ title, description, path }) => {
  const normalizedPath = path === '/' ? '' : path;
  const url = `${SITE_URL}${normalizedPath}`;

  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'bn_BD',
      url,
      siteName: 'বিয়ে',
      title,
      description,
    },
  };
};

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
