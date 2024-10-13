// service-worker.js

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4XSOOTIxbJvIpfd96MsyJZDW2aNi_uPc",
  authDomain: "loto-hack.firebaseapp.com",
  projectId: "loto-hack",
  storageBucket: "loto-hack.appspot.com",
  messagingSenderId: "138353732568",
  appId: "1:138353732568:web:71f27a582f25cd544aa0ad",
  measurementId: "G-P53RKCKPQ5"
};

// Inicializando Firebase
firebase.initializeApp(firebaseConfig);

// Instanciando Firebase Messaging para lidar com as notificações em segundo plano
const messaging = firebase.messaging();

// Evento para receber notificações push em segundo plano
messaging.onBackgroundMessage(function(payload) {
  console.log('Recebeu uma mensagem em background:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png'  // Substitua pelo ícone correto do seu projeto
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// -----------------------------
// Código do PWA
// -----------------------------

const CACHE_NAME = 'loto-hack-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/firebase-messaging.js',
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
  // Adicione outros recursos que você deseja cachear
];

// Evento de instalação do Service Worker (caching dos arquivos)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições e serve do cache, se disponível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se encontrado
        if (response) {
          return response;
        }
        // Caso contrário, busca da rede
        return fetch(event.request);
      })
  );
});

// Remove caches antigos durante a ativação
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
