// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js');

// Inicialize o Firebase no Service Worker
const firebaseConfig = {
  apiKey: "AIzaSyB4XSOOTIxbJvIpfd96MsyJZDW2aNi_uPc",
  authDomain: "loto-hack.firebaseapp.com",
  projectId: "loto-hack",
  storageBucket: "loto-hack.appspot.com",
  messagingSenderId: "138353732568",
  appId: "1:138353732568:web:71f27a582f25cd544aa0ad",
  measurementId: "G-P53RKCKPQ5"
};

firebase.initializeApp(firebaseConfig);

// Obtém uma instância do Firebase Messaging para lidar com mensagens em background
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Recebida uma mensagem em background:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// PWA: Cache para o PWA
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
];

// Instala o Service Worker e adiciona os recursos ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições e serve os recursos do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache, se encontrado
        if (response) {
          return response;
        }
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
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
