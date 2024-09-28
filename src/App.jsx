/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { RouterProvider, useLocation } from 'react-router-dom';
import router from './routes/Routes';
import toast, { Toaster } from 'react-hot-toast';
import { Toast } from './utils/toast';
import { logEvent } from 'firebase/analytics';
import { analytics, onMessageListener, requestForToken } from './firebase/app';
import AnalyticsService from './firebase/analyticsService';

function App() {
  const [count, setCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // useEffect(() => {
  //   // Check if Notification API is supported
  //   if ('Notification' in window) {
  //     // Check current permission
  //     if (Notification.permission === 'default') {
  //       // Request permission if not granted or denied yet
  //       Notification.requestPermission()
  //         .then((permission) => {
  //           if (permission === 'granted') {
  //             console.log('Notification permission granted.');
  //             requestForToken().then((token) => {
  //               console.log('toke', token);
  //             });
  //           } else if (permission === 'denied') {
  //             console.log('Notification permission denied.');
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('Error requesting notification permission:', error);
  //         });
  //     } else {
  //       console.log('Notification permission:', Notification.permission);
  //     }
  //   } else {
  //     console.log('This browser does not support notifications.');
  //   }
  //   // Handle incoming messages
  //   onMessageListener()
  //     .then((payload) => {
  //       console.log('Message received. ', payload);
  //       // Show notification in your React app
  //     })
  //     .catch((err) => console.log('failed: ', err));
  // }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      Toast.successToast('You are back online!');
    };

    const handleOffline = () => {
      setIsOnline(false);
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
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
