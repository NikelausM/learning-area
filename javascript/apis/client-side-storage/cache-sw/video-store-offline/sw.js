
// Install the service worker
self.addEventListener('install', function(e) {
  // wait until promise inside has finished
  e.waitUntil(
    // this promise fulfills with a cache object representing the video-store cache
    caches.open('video-store').then(function(cache) {
      // fetch a series of assets and add their responses to the cache
      return cache.addAll([
        '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/',
        '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/index.html',
        '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/index.js',
        '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/style.css'
      ]);
    })
    );
});
  
// responding to further requests
// when fetch event is raised...
self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  // provide custom response to the request
  e.respondWith(
    // if match found in cache then respond with that, else fetch the response from the network
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
  