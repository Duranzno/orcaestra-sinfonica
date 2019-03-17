import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app'
import 'firebase/messaging';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class MessagingService {

  private messaging;
  private messageSource = new Subject()
  private permission: boolean = false;
  currentMessage = this.messageSource.asObservable() // message observable to show in Angular component

  constructor(private afs: AngularFirestore) {
    if (firebase.messaging.isSupported) {
      this.messaging = firebase.messaging();
      console.log("Las notificaciones PUSH estan soportadas")
    } else {
      console.log('Unable to Instantiate Firebase Messaing');
    }
  }
  // get permission to send messages
  getPermission(user) {
    try {
      this.messaging.requestPermission()
        .then(() => {
          this.permission = true;
          console.log('Notification permission granted.');
          return this.messaging.getToken()
        })
        .then(token => {
          console.log(token)
          this.saveToken(user, token)
        })
        .catch((err) => {
          console.log('Unable to get permission to notify.', err);
        });
    }
    catch (e) {
      console.log('Unable to Request PUSH Permission', e);
    }
  }

  // Listen for token refresh
  monitorRefresh(user) {
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
        .then(refreshedToken => {
          console.log('Token refreshed.');
          this.saveToken(user, refreshedToken)
        })
        .catch(err => console.log(err, 'Unable to retrieve new token'))
    });
  }
  // save the permission token in firestore
  private saveToken(user, token): void {

    const currentTokens = user.fcmTokens || {}

    // If token does not exist in firestore, update db
    if (!currentTokens[token]) {
      const userRef = this.afs.collection('users').doc(user.uid)
      const tokens = { ...currentTokens, [token]: true }
      userRef.update({ fcmTokens: tokens })
    }
  }
  receiveMessages() {
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload);
      this.messageSource.next(payload)
    });

  }
  init(user) {
    if (firebase.messaging.isSupported) {
      console.log("Las notificaciones PUSH estan soportadas");
      this.getPermission(user)
      this.monitorRefresh(user)
      this.receiveMessages()
    }
    else {
      console.log("No soportado chico")
    }
  }
}