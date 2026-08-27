import PrivateRoute from '@/routes/PrivateRoute';
import { NO_INDEX_METADATA } from '@/lib/seo';

export const metadata = NO_INDEX_METADATA;

export default function PayLayout({ children }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
