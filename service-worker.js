/* Troque o número da versão sempre que atualizar os arquivos do app */
const CACHE="meu-treino-v10";
const ASSETS=["./","index.html","style.css","script.js","manifest.json","icon-192.png","icon-512.png"];

self.addEventListener("install",e=>{
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));
});

self.addEventListener("activate",e=>{
    e.waitUntil(
        caches.keys()
            .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
            .then(()=>self.clients.claim())
    );
});

/* Rede primeiro (sempre pega a versão nova); cache só se estiver sem internet */
self.addEventListener("fetch",e=>{
    const req=e.request;
    if(req.method!=="GET"||new URL(req.url).origin!==location.origin)return;

    e.respondWith(
        fetch(req,{cache:"no-cache"}).then(res=>{
            const copy=res.clone();
            caches.open(CACHE).then(c=>c.put(req,copy));
            return res;
        }).catch(()=>caches.match(req).then(r=>r||caches.match("index.html")))
    );
});

self.addEventListener("notificationclick",e=>{
    e.notification.close();
    e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>l.length?l[0].focus():clients.openWindow("./")));
});
