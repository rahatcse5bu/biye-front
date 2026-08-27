export const unregisterServiceWorkers = async () => {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map((registration) => registration.unregister())
    );
    if (registrations.length) {
      // eslint-disable-next-line no-console
      console.log('Unregistered stale service workers:', registrations.length);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to unregister service workers:', error);
  }
};
