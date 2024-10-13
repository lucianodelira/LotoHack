// firebase-messaging-sw.js

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js');

// Inicialize o Firebase com a mesma configuração usada no seu app
const firebaseConfig = {
  apiKey: "AIzaSyB4XSOOTIxbJvIpfd96MsyJZDW2aNi_uPc",
  authDomain: "loto-hack.firebaseapp.com",
  projectId: "loto-hack",
  storageBucket: "loto-hack.appspot.com",
  messagingSenderId: "138353732568",
  appId: "1:138353732568:web:71f27a582f25cd544aa0ad",
  measurementId: "G-P53RKCKPQ5"
};

// Inicializar o Firebase no Service Worker
firebase.initializeApp(firebaseConfig);

// Obtém uma instância do Firebase Messaging para lidar com mensagens em background
const messaging = firebase.messaging();

// Evento para receber notificações em segundo plano
messaging.onBackgroundMessage(function(payload) {
  console.log('Recebida uma mensagem em background:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
