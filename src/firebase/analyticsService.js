import { getBrowserAnalytics } from './app';

async function withAnalytics(callback) {
  try {
    const analytics = await getBrowserAnalytics();

    if (analytics) {
      await callback(analytics);
    }
  } catch (error) {
    console.error('Firebase Analytics is unavailable:', error);
  }
}

const AnalyticsService = {
  logEvent: (
    eventName = 'test-1',
    eventParams = {
      button_name: 'signup_button',
      location: 'homepage',
    }
  ) =>
    withAnalytics(async (analytics) => {
      const { logEvent } = await import('firebase/analytics');
      logEvent(analytics, eventName, eventParams);
    }),

  setUserId: (userId) =>
    withAnalytics(async (analytics) => {
      const { setUserId } = await import('firebase/analytics');
      setUserId(analytics, userId);
    }),

  setUserProperties: (properties) =>
    withAnalytics(async (analytics) => {
      const { setUserProperties } = await import('firebase/analytics');
      setUserProperties(analytics, properties);
    }),
};

export default AnalyticsService;
