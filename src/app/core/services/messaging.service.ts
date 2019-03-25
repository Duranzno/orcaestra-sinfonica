import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app'
import 'firebase/messaging';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { SwUpdate } from '@angular/service-worker';


@Injectable()
export class MessagingService {

  private messaging = firebase.messaging();
  private messageSource = new Subject()
  currentMessage = this.messageSource.asObservable() // message observable to show in Angular component

  constructor(
    private swUpdate: SwUpdate,
    private afs: AngularFirestore
  ) {
    // this.checkUpdate();
    // if (firebase.messaging.isSupported) {
    //   console.log(`"Las notificaciones PUSH estan soportadas c:`)
    //   this.messaging = firebase.messaging();
    // } else {
    //   console.log(`No soporta PUSH :c`);
    // }
  }

  getPermission(user) {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Se tiene el permiso.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log('Token es', token)
        this.saveToken(user, token)
      })
      .catch((err) => {
        console.log('No se puede pedir permiso ', err);
      });
  }

  // Listen for token refresh
  monitorRefresh(user) {
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
        .then(refreshedToken => {
          console.log('Token refrescado e.e.');
          this.saveToken(user, refreshedToken)
        })
        .catch(err => console.log(err, 'Unable to retrieve new token'))
    });
  }
  // save the permission token in firestore
  private saveToken(user, token): void {

    const currentTokens = user.fcmTokens || {}
    console.log(`Tokens actuales ${JSON.stringify(currentTokens)} y nuevo token ${token} }`)

    // If token does not exist in firestore, update db
    if (!currentTokens[token]) {
      const userRef = this.afs.collection('usuarios').doc(/*user.uid:*/'EDNbvzCTMncoM2rCv5oqpDviNEH2')
      const tokens = { ...currentTokens, [token]: true }
      userRef.update({ fcmTokens: tokens })
    }
  }
  // used to show message when app is open
  receiveMessages() {
    
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload);
      this.messageSource.next(payload)
    });
  }

  checkUpdate() {
    if (window) {
      if (this.swUpdate.isEnabled) {
        (this.swUpdate.available.subscribe(() => {
          if (confirm('Nueva version de Orcaestra Sinfonica Disponible.¿Quiere descargarla?')) {
            window.location.reload();
          }
        }));
      }
    }
  }
}