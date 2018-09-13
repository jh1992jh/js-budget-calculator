importScripts('js/idb.js');
importScripts('js/utilities.js');




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
                    '/budget.html',
                    '/js/idb.js',
                    '/js/utilities.js', 
                    '/js/registerSw.js',
                    '/js/script.js',
                    '/js/budget.js',
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

self.addEventListener('notificationclick', (e) => {
  const notification = e.notification;
  const action = e.action;
  console.log(e);
  console.log(e.action);


  if(action === 'disableAlerts') {
      clearAlert('alert')
    notification.close()
  } else {
    notification.close();
  }
}) 
