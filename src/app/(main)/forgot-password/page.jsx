'use client';

import ForgotPassword from '@/views/pages/ForgotPassword/ForgotPassword';

export default function ForgotPasswordPage() {
  // TODO: the layout renders per request, so useSearchParams needs no Suspense boundary and the form ships in the HTML.
  return <ForgotPassword />;
}
