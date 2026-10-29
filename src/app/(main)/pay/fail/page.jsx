'use client';

import { Suspense } from 'react';
import PayFail from '@/views/pages/PayFail/PayFail';

export default function PayFailPage() {
  // TODO: useSearchParams needs its own boundary on a prerendered page; the root layout no longer wraps every page.
  return (
    <Suspense fallback={null}>
      <PayFail />
    </Suspense>
  );
}
