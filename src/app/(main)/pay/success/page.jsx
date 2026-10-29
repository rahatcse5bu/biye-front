'use client';

import { Suspense } from 'react';
import PaySuccess from '@/views/pages/PaySuccess/PaySuccess';

export default function PaySuccessPage() {
  // TODO: useSearchParams needs its own boundary on a prerendered page; the root layout no longer wraps every page.
  return (
    <Suspense fallback={null}>
      <PaySuccess />
    </Suspense>
  );
}
