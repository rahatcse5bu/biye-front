import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// TODO: false during SSR and hydration, true afterwards; gate client-only state (e.g. login) so the first render matches the server HTML.
export const useHydrated = () =>
  useSyncExternalStore(subscribe, () => true, () => false);
