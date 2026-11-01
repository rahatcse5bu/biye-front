import { NO_INDEX_FOLLOW_METADATA } from '@/lib/seo';

export const metadata = NO_INDEX_FOLLOW_METADATA;

// TODO: rendering per request lets useSearchParams run on the server, so the form and its H1 ship in the HTML.
export const dynamic = 'force-dynamic';

export default function ForgotPasswordLayout({ children }) {
  return children;
}
