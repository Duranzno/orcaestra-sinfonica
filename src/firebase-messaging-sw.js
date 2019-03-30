
importScripts('https://www.gstatic.com/firebasejs/5.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.1/firebase-messaging.js');
const config = {
  messagingSenderId: '246048437876'
}
firebase.initializeApp(config);
const messaging = firebase.messaging();