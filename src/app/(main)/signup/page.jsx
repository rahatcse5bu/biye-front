'use client';

import { Suspense } from 'react';
import { Signup } from '@/views/Signup/Signup';

export default function SignupPage() {
  // TODO: useSearchParams needs its own boundary on a prerendered page; the root layout no longer wraps every page.
  return (
    <Suspense fallback={null}>
      <Signup />
    </Suspense>
  );
}
