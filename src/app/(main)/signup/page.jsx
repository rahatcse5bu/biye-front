'use client';

import { Signup } from '@/views/Signup/Signup';

export default function SignupPage() {
  // TODO: the layout renders per request, so useSearchParams needs no Suspense boundary and the form ships in the HTML.
  return <Signup />;
}
