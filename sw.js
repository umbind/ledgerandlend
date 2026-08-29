/**
 * Ledger & Lend - Service Worker
 * Comprehensive Offline Pre-caching, Stale Cache Cleanup & Network-Resilient Strategies
 */

const CACHE_NAME = 'ledger-lend-v3.0';

const STATIC_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './manifest.json',
  './assets/icon.svg',
  './js/app.js',
  './js/components/knowledge.js',
  './js/data/affiliates.js',
  './js/data/articles.js',
  './js/data/faqs.js',
  './js/data/i18n.js',
  './js/data/legal.js',
  './js/data/searchIndex.js',
  './js/data/diagnosticRunner.js',
  './js/utils/charts.js',
  './js/utils/formatters.js',
  './js/utils/mathParser.js',
  './js/utils/storage.js',
  './js/utils/exportShare.js',
  // Finance Calculators
  './js/calculators/finance/emi.js',
  './js/calculators/finance/sip.js',
  './js/calculators/finance/mortgage.js',
  './js/calculators/finance/tax-discount.js',
  './js/calculators/finance/tip-split.js',
  // Health Calculators
  './js/calculators/health/bmi.js',
  './js/calculators/health/body-fat.js',
  './js/calculators/health/calorie-tdee.js',
  './js/calculators/health/ideal-weight.js',
  './js/calculators/health/macro-calculator.js',
  './js/calculators/health/target-heart-rate.js',
  './js/calculators/health/waist-hip.js',
  './js/calculators/health/water-intake.js',
  // Medical & Clinical Calculators
  './js/calculators/medical/pregnancy-due-date.js',
  './js/calculators/medical/body-surface-area.js',
  './js/calculators/medical/mean-arterial-pressure.js',
  './js/calculators/medical/dosage-calculator.js',
  './js/calculators/medical/egfr-kidney.js',
  // Math & Utility Calculators
  './js/calculators/math/age-date.js',
  './js/calculators/math/fuel-cost.js',
  './js/calculators/math/percentage.js',
  './js/calculators/math/scientific.js',
  './js/calculators/math/time-duration.js',
  './js/calculators/math/unit-converter.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // For same-origin static assets: Cache First, Network Fallback
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch update in background for next time (Stale-while-revalidate)
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          }).catch(() => {/* Offline fallback ignore */});
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // For external resources (Fonts, Tailwind, Lucide): Network First with Cache Fallback
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
