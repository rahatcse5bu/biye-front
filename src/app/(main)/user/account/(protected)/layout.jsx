import PrivateRoute from '@/routes/PrivateRoute';

export default function ProtectedAccountLayout({ children }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
