if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('ServiceWorker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.log('Falha ao registrar o ServiceWorker:', error);
      });
  });
} else {
  console.log('Service Workers não são suportados neste navegador.');
}


// Importando as bibliotecas necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Função para solicitar permissão de notificações do usuário
async function requestPermission() {
  console.log('Solicitando permissão para notificações...');
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Permissão concedida!');
    getFCMToken();
  } else {
    console.log('Permissão para notificações negada.');
  }
}

// Função para obter o token FCM
async function getFCMToken() {
  try {
    const token = await getToken(messaging, { vapidKey: 'BDm4dAIMcu31t5ChnxwBpDu5iT8qSSvwIb332nSt6NwQexeQVNinuo68eBTilpAWZGnHKyKyZWKOdmMtkSq7__s' });
    if (token) {
      console.log('Token FCM:', token);
      // Aqui você pode enviar o token para o servidor para armazená-lo e usá-lo para enviar notificações push
    } else {
      console.log('Não foi possível obter o token FCM.');
    }
  } catch (error) {
    console.error('Erro ao obter o token FCM:', error);
  }
}

// Escutando as mensagens enquanto o app estiver em primeiro plano
onMessage(messaging, (payload) => {
  console.log('Mensagem recebida no foreground:', payload);
  // Exibir uma notificação, se necessário
});

// Chama a função para solicitar permissão ao carregar a página
requestPermission();
