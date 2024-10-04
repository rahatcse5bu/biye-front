import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates service worker in the background
      includeAssets: [
        'pnc-nikah.ico',
        '/assets/icons/female.svg',
        '/assets/icons/male.svg',
        '/assets/icons/logo.png',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        name: 'PNC-Nikah',
        short_name: 'pnc_nikah',
        description: 'A matrimony site ',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/icons/logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/icons/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => true, // Cache all requests
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'default-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' ||
              request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/server\.pnc-nikah\.com\/api\/v1\/.*$/, // Replace with your API URL pattern
            handler: 'NetworkFirst', // Tries network first, falls back to cache
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50, // Maximum number of API responses to cache
                maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
              },
              cacheableResponse: {
                statuses: [0, 200], // Cache responses with these HTTP status codes
              },
            },
          },
        ],
      },
    }),
  ],
});
