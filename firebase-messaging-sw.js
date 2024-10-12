// Importa o Firebase
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

// Inicializa o Firebase no Service Worker
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

// Obtém uma instância do Firebase Messaging
const messaging = firebase.messaging();

// Função para mostrar a notificação
messaging.onBackgroundMessage(function(payload) {
  console.log('Notificação push recebida no background: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/logo.png'  // Caminho do ícone
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
