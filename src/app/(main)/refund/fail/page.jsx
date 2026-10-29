'use client';

import { Suspense } from 'react';
import RefundFail from '@/views/pages/RefundFail/RefundFail';

export default function RefundFailPage() {
  // TODO: useSearchParams needs its own boundary on a prerendered page; the root layout no longer wraps every page.
  return (
    <Suspense fallback={null}>
      <RefundFail />
    </Suspense>
  );
}
