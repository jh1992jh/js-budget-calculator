var CACHE_STATIC = 'static-v1';
var CACHE_DYNAMIC = 'dynamic-v2';

self.addEventListener('install', event => {
    console.log('Installing Service Worker ', event);

    event.waitUntil(
        caches.open(CACHE_STATIC)
            .then(cache => {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/js/registerSw.js',
                    '/js/script.js',
                    '/css/styles.css',
                    'https://fonts.googleapis.com/css?family=Montserrat'
                ])
            })
    )
})

self.addEventListener('activate', event => {
    console.log('Service Worker Activated ', event);
    
    event.waitUntil(
        caches.keys()
            .then(keyList => {
                return Promise.all(keyList.map(key => {
                    if(key !== CACHE_STATIC && key !== CACHE_DYNAMIC) {
                        console.log('Removing Old Cache ', key)
                        return caches.delete(key)
                    }
                }))
            })
    )
    return self.clients.claim();
})

 self.addEventListener('fetch', event => {
    if(event.request.url.indexOf('/') > -1) {
        event.respondWith(
          caches.open(CACHE_DYNAMIC)
            .then(function(cache) {
              return fetch(event.request)
                .then(function(res) {
                  cache.put(event.request, res.clone()); 
                  return res;
                })
            })
        );
      } else {
        event.respondWith(
          caches.match(event.request)
          .then(function(response) {
            if(response) {
              return response;
            } else {
              return fetch(event.request)
                .then(function(res) {
                  caches.open(CACHE_DYNAMIC)
                    .then(function(cache) {
                      cache.put(event.request.url,
                        // res.clone() clones the response, done because you can only consume responses from promises once
                        res.clone())
                      return res;
                    })
                })
                .catch(function(err) {
                  return caches.open(CACHE_STATIC)
                })
            }
          })
        )}
}) 