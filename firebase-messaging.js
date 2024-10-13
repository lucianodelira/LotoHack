// firebase-messaging.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4XSOOTIxbJvIpfd96MsyJZDW2aNi_uPc",
  authDomain: "loto-hack.firebaseapp.com",
  projectId: "loto-hack",
  storageBucket: "loto-hack.appspot.com",
  messagingSenderId: "138353732568",
  appId: "1:138353732568:web:71f27a582f25cd544aa0ad",
  measurementId: "G-P53RKCKPQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

// Request permission to send notifications
messaging.requestPermission()
  .then(() => {
    console.log('Permissão concedida para notificações!');
    // Get the FCM token
    return getToken(messaging);
  })
  .then((token) => {
    console.log('Token de notificação FCM:', token);
    // Envie o token para o backend para associá-lo ao usuário
  })
  .catch((err) => {
    console.error('Erro ao solicitar permissão para notificações:', err);
  });

// Handle messages when the app is in the foreground
onMessage(messaging, (payload) => {
  console.log('Mensagem recebida em primeiro plano:', payload);
  // Customizar a exibição da notificação
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icons/favicon.png'
  };
  new Notification(notificationTitle, notificationOptions);
});
