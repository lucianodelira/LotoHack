// Registro do Service Worker para PWA e Firebase Messaging
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registrado com sucesso:', registration.scope);
      })
      .catch(error => {
        console.log('Falha ao registrar ServiceWorker:', error);
      });
  });
}

// Importar as funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js";

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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firebase Messaging
const messaging = getMessaging(app);

// Solicitar permissão para enviar notificações usando a API de Notificações
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    console.log('Permissão concedida para notificações!');
    
    // Obter o token FCM para enviar ao backend
    return getToken(messaging);
  } else {
    console.log('Permissão negada para notificações.');
  }
}).then((token) => {
  if (token) {
    console.log('Token de notificação FCM:', token);
    // Enviar o token para o backend para associá-lo ao usuário
  }
}).catch((err) => {
  console.error('Erro ao solicitar permissão para notificações:', err);
});

// Lidar com mensagens quando o app está em primeiro plano
onMessage(messaging, (payload) => {
  console.log('Mensagem recebida em primeiro plano:', payload);
  
  // Exibir a notificação
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icons/favicon.png'
  };
  
  new Notification(notificationTitle, notificationOptions);
});
