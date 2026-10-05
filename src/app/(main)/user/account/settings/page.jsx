'use client';

import PrivateRoute from '@/routes/PrivateRoute';
import Settings from '@/views/pages/Settings/Settings';

export default function SettingsPage() {
  return (
    <PrivateRoute>
      <Settings />
    </PrivateRoute>
  );
}
