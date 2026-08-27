import UserLayout from '@/Layout/userLayout';
import { NO_INDEX_METADATA } from '@/lib/seo';

export const metadata = NO_INDEX_METADATA;

export default function AccountLayout({ children }) {
  return <UserLayout>{children}</UserLayout>;
}
