/**
 * Ledger & Lend - Service Worker
 * Version 12.0.0 - Production Dynamic Cache & Immediate Update Engine
 */

const CACHE_NAME = 'ledger-lend-v12.0-unified';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/manifest.json',
  '/js/lucide.min.js',
  '/js/controller.js',
  '/sip/',
  '/emi/',
  '/mortgage/',
  '/compound-interest/',
  '/tax-discount/',
  '/tip-split/',
  '/fuel-cost/',
  '/time-duration/'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch((err) => {
      console.warn('SW cache.addAll non-fatal error:', err);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Purging legacy cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Network First, Cache Fallback for all same-origin HTML and scripts
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // External CDNs: Network first with cache fallback
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
      }
      return networkResponse;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
