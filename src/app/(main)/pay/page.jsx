'use client';

import { Suspense } from 'react';
import AfterPay from '@/views/pages/AfterPay/AfterPay';

export default function PayPage() {
  // TODO: useSearchParams needs its own boundary on a prerendered page; the root layout no longer wraps every page.
  return (
    <Suspense fallback={null}>
      <AfterPay />
    </Suspense>
  );
}
