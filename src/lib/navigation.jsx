'use client';

import { useCallback, useMemo, useEffect } from 'react';
import NextLink from 'next/link';
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';

function getHref(destination) {
  if (typeof destination === 'string') {
    return destination;
  }

  if (!destination) {
    return '/';
  }

  return `${destination.pathname || ''}${destination.search || ''}${destination.hash || ''}`;
}

export function Link({ to, replace = false, state, ...props }) {
  void state;
  return <NextLink {...props} href={getHref(to)} replace={replace} />;
}

export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (destination, options = {}) => {
      if (typeof destination === 'number') {
        if (destination === -1) {
          router.back();
        } else if (destination === 0) {
          router.refresh();
        } else {
          window.history.go(destination);
        }
        return;
      }

      const href = getHref(destination);
      const navigationOptions = { scroll: options.scroll };

      if (options.replace) {
        router.replace(href, navigationOptions);
      } else {
        router.push(href, navigationOptions);
      }
    },
    [router]
  );
}

export function useLocation() {
  const pathname = usePathname();

  return useMemo(
    () => ({
      pathname,
      search: '',
      hash: '',
      state: null,
      key: pathname,
    }),
    [pathname]
  );
}

export function useParams() {
  return useNextParams();
}

export function useSearchParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useNextSearchParams();

  const setSearchParams = useCallback(
    (nextInit, options = {}) => {
      const current = new URLSearchParams(searchParams.toString());
      const nextValue =
        typeof nextInit === 'function' ? nextInit(current) : nextInit;
      const nextParams =
        nextValue instanceof URLSearchParams
          ? nextValue
          : new URLSearchParams(nextValue);
      const query = nextParams.toString();
      const href = query ? `${pathname}?${query}` : pathname;

      if (options.replace) {
        router.replace(href);
      } else {
        router.push(href);
      }
    },
    [pathname, router, searchParams]
  );

  return [searchParams, setSearchParams];
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);

  return null;
}
