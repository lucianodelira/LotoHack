const CACHE_NAME = 'loto-hack-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/icons/compartilhar.png',
    '/icons/resultado.png',
    '/icons/jogar.png',
    '/icons/palpite.png',
    '/icons/LotoHack.png',
    '/icons/favicon.png',
    '/icons/favicon.ico',
    '/icons/favicon.svg',
];

// Instala o Service Worker e adiciona os recursos ao cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercepta as requisições e serve os recursos do cache quando disponíveis
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna o recurso do cache se encontrado
                if (response) {
                    return response;
                }
                // Caso contrário, busca na rede
                return fetch(event.request);
            })
    );
});

// Atualiza o Service Worker e remove caches antigos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Adicionando suporte para notificações push
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};

    const options = {
        body: data.body || 'Nova mensagem!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/favicon.png',
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Notificação', options)
    );
});

// Quando o usuário clica na notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
