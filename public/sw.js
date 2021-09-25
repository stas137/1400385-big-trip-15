const CACHE_PREFIX = 'bigtrip-cache';
const CACHE_VER = 'v15';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const HTTP_STATUS_OK = 200;
const RESPONCE_SAFE_TYPE = 'basic';

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([
        '/',
        '/index.html',
        '/bundle.js',
        '/css/style.css',
        '/img/icons/bus.png',
        '/img/icons/check-in.png',
        '/img/icons/drive.png',
        '/img/icons/flight.png',
        '/img/icons/restaurant.png',
        '/img/icons/ship.png',
        '/img/icons/sightseeing.png',
        '/img/icons/taxi.png',
        '/img/icons/train.png',
        '/img/icons/transport.png',
        '/img/header-bg.png',
        '/img/header-bg@2x.png',
        '/img/logo.png',
        '/fonts/Montserrat-Bold.woff2',
        '/fonts/Montserrat-ExtraBold.woff2',
        '/fonts/Montserrat-Medium.woff2',
        '/fonts/Montserrat-Regular.woff2',
        '/fonts/Montserrat-SemiBold.woff2',
      ])),
    );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.map((key) => {
          if ((key.startsWith(CACHE_PREFIX)) && (key !== CACHE_NAME)) {
            return caches.delete(key);
          }

          return null;
        })
          .filter((key) => key !== null),
      )),
    );
});

const handleFetch = (evt) => {
  const {request} = evt;

  evt.respondWith(
    caches.match(request)
      .then((cacheResponce) => {
        if (cacheResponce) {
          return cacheResponce;
        }

        return fetch(request)
          .then((responce) => {
            if (!responce || responce.status !== HTTP_STATUS_OK || responce.type !== RESPONCE_SAFE_TYPE) {
              return responce;
            }

            const clonedResponce = responce.clone();

            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, clonedResponce));
            
            return responce;
          })
      }),
  );
};

self.addEventListener('fetch', handleFetch);
