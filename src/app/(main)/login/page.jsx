'use client';

import { Login } from '@/views/Login/Login';

export default function LoginPage() {
  // TODO: the layout renders per request, so useSearchParams needs no Suspense boundary and the form ships in the HTML.
  return <Login />;
}
