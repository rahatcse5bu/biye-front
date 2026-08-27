'use client';

import PrivateRoute from '@/routes/PrivateRoute';
import SendForm from '@/views/pages/SendForm/SendForm';

export default function SendFormPage() {
  return (
    <PrivateRoute>
      <SendForm />
    </PrivateRoute>
  );
}
