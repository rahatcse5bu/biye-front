/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_apiKey,
  authDomain: import.meta.env.VITE_REACT_APP_authDomain,
  projectId: import.meta.env.VITE_REACT_APP_projectId,
  storageBucket: import.meta.env.VITE_REACT_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId,
  appId: import.meta.env.VITE_REACT_APP_appId,
  measurementId: import.meta.env.VITE_REACT_APP_measurementId,
};

// Request FCM token (ensure VAPID key is set correctly)
export const requestForToken = async () => {
  try {
    console.log('Requesting notification permission...');
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_REACT_APP_vapidKey,
      });
      if (token) {
        console.log('FCM Token received:', token);
        return token;
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
      }
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.error('Error retrieving FCM token:', error);
  }
  return null;
};
// Handle incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      resolve(payload);
    });
  });
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, auth, analytics, messaging };
