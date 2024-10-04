/* eslint-disable no-undef */
// public/firebase-messaging-sw.js
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js'
);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCGMfMlLJk65tcQi1_IocJKI-KD11mfGpE',
  authDomain: 'pnc-nikah.firebaseapp.com',
  projectId: 'pnc-nikah',
  storageBucket: 'pnc-nikah.appspot.com',
  messagingSenderId: '893917202752',
  appId: '1:893917202752:web:37d31a29adbf37bcd712a5',
  measurementId: 'G-7B1DS92E9Y',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
