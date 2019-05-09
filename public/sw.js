console.log("sw here")  
window.addEventListener("install", event => {
    event.waitUntil(
      caches.open("precache-v1").then(cache => {
        cache.addAll(["/", "app.js"]);
      })
    );
  });
  
  window.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });