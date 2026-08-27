const DEFAULT_SITE_URL = 'https://www.biye.info';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/+$/, '');

export const NO_INDEX_METADATA = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};
