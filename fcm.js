// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const config = {
  apiKey: 'AIzaSyDm7icowS8Y-M4iJqaazUoA8VehMUK_Bsg',
  authDomain: 'orcaestra-sinfonica.firebaseapp.com',
  databaseURL: 'https://orcaestra-sinfonica.firebaseio.com',
  projectId: 'orcaestra-sinfonica',
  storageBucket: 'orcaestra-sinfonica.appspot.com',
  messagingSenderId: '246048437876'
}
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const title = "Hello World";
  const options = {
    body: payload.data.status
  }
  return self.registration.showNotification(title, options)
})
// messaging.requestPermission().then(function () {
//   console.log('Notification permission granted.');
//   // TODO(developer): Retrieve an Instance ID token for use with FCM.
//   // ...
// }).catch(function (err) {
//   console.log('Unable to get permission to notify.', err);
// });