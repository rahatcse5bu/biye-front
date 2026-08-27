'use client';

import PrivateRoute from '@/routes/PrivateRoute';
import Refund from '@/views/pages/Refund/Refund';

export default function AdminRefundPage() {
  return (
    <PrivateRoute>
      <Refund />
    </PrivateRoute>
  );
}
