/* UniOrbis — service worker: vai sempre buscar a versão mais recente da
   página e só usa a cópia guardada quando não há internet. */
var C="anfitriu-v1";
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","icon-192.png","icon-512.png","manifest.webmanifest"]).catch(function(){})}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==="navigate"){e.respondWith(fetch(r,{cache:"no-cache"}).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put("./",cp)});return res}).catch(function(){return caches.match("./")}));return}
  e.respondWith(caches.match(r).then(function(m){var f=fetch(r).then(function(res){if(res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res}).catch(function(){return m});return m||f}))});
