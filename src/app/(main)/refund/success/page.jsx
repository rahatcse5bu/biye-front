'use client';

import { Suspense } from 'react';
import RefundSuccess from '@/views/pages/RefundSuccess/RefundSuccess';

export default function RefundSuccessPage() {
  // TODO: useSearchParams needs its own boundary on a prerendered page; the root layout no longer wraps every page.
  return (
    <Suspense fallback={null}>
      <RefundSuccess />
    </Suspense>
  );
}
