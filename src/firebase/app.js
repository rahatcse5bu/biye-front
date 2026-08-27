import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function getBrowserAnalytics() {
  if (typeof window === 'undefined') {
    return null;
  }

  const { getAnalytics, isSupported } = await import('firebase/analytics');
  return (await isSupported()) ? getAnalytics(app) : null;
}

async function getBrowserMessaging() {
  if (typeof window === 'undefined') {
    return null;
  }

  const { getMessaging, isSupported } = await import('firebase/messaging');
  return (await isSupported()) ? getMessaging(app) : null;
}

export async function requestForToken() {
  if (typeof Notification === 'undefined') {
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    const messaging = await getBrowserMessaging();

    if (permission !== 'granted' || !messaging) {
      return null;
    }

    const { getToken } = await import('firebase/messaging');
    return await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
  } catch (error) {
    console.error('Error retrieving FCM token:', error);
    return null;
  }
}

export async function onMessageListener() {
  const messaging = await getBrowserMessaging();

  if (!messaging) {
    return null;
  }

  const { onMessage } = await import('firebase/messaging');
  return new Promise((resolve) => {
    onMessage(messaging, resolve);
  });
}

export async function setupNotifications(onForegroundMessage) {
  if (typeof Notification === 'undefined') {
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    const messaging = await getBrowserMessaging();

    if (permission !== 'granted' || !messaging) {
      return;
    }

    const { getToken, onMessage } = await import('firebase/messaging');
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    console.log('FCM Token:', token);
    onMessage(messaging, (payload) => {
      onForegroundMessage?.(payload);
    });
  } catch (error) {
    console.error('Error setting up notifications:', error);
  }
}

export { app, auth };
