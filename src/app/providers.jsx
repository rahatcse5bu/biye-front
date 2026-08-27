'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/contexts/UserContext';
import { BioProvider } from '@/contexts/BioContext';
import FilterProvider from '@/contexts/FilterContext';
import PrimaryFilterProvider from '@/contexts/PrimaryFilterContext';
import { Toast } from '@/utils/toast';
import { unregisterServiceWorkers } from '@/utils/unregisterServiceWorker';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    unregisterServiceWorkers();

    const handleOnline = () => {
      Toast.successToast('You are back online!');
    };

    const handleOffline = () => {
      Toast.errorToast('You are offline. Check your network connection');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserProvider>
            <BioProvider>
              <FilterProvider>
                <PrimaryFilterProvider>
                  {children}
                  <Toaster />
                </PrimaryFilterProvider>
              </FilterProvider>
            </BioProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
