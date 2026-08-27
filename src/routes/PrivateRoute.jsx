'use client';

/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LoadingCircle from '../components/LoadingCircle/LoadingCircle';
import UserContext from '../contexts/UserContext';

const PrivateRoute = ({ children }) => {
  const { userLoading, user } = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router, user, userLoading]);

  if (userLoading || !user) {
    return <LoadingCircle />;
  }

  return children;
};

export default PrivateRoute;
