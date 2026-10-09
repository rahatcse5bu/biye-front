// TODO: NEXT_PUBLIC_API_URL overrides the default (e.g. a custom backend domain); no trailing slash.
export const baseUrl =
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://biye-backend.vercel.app/api/v1');
