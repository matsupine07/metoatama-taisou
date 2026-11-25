/* 2026-11-25：このアプリは https://13.pineapp.jp/ に移った。前の住所で動いていたオフライン用の仕組みを片づけて、新しい住所へ移す */
self.addEventListener("install", function(){ self.skipWaiting(); });
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){ return Promise.all(keys.map(function(k){ return caches.delete(k); })); })
      .then(function(){ return self.registration.unregister(); })
      .then(function(){ return self.clients.matchAll({ type: "window" }); })
      .then(function(cs){ cs.forEach(function(c){ c.navigate("https://13.pineapp.jp/"); }); })
  );
});
