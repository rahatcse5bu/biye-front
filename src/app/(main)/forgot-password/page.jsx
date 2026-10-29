'use client';

import { Suspense } from 'react';
import ForgotPassword from '@/views/pages/ForgotPassword/ForgotPassword';

export default function ForgotPasswordPage() {
  // TODO: useSearchParams needs its own boundary on a prerendered page; the root layout no longer wraps every page.
  return (
    <Suspense fallback={null}>
      <ForgotPassword />
    </Suspense>
  );
}
