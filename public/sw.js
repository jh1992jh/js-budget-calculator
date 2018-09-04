var CACHE_STATIC = 'static-v1';
var CACHE_DYNAMIC = 'dynamic-v1';

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
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if(response) {
                    return response
                } else {
                    return fetch(event.request)
                        .then(res => {
                            caches.open(CACHE_DYNAMIC)
                                .then(cache => {
                                    cache.put(event.request.url, res.clone())
                                    return res;
                                })
                                
                        })
                }
            })
            .catch(err => console.log(err))
    )
})