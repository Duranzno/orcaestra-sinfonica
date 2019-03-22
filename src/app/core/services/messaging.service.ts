import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app'
import 'firebase/messaging';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { SwUpdate } from '@angular/service-worker';


@Injectable()
export class MessagingService {

  private messaging;
  private messageSource = new Subject()
  private permission: boolean = false;
  currentMessage = this.messageSource.asObservable() // message observable to show in Angular component

  constructor(
    private swUpdate: SwUpdate,
    private afs: AngularFirestore) {
    if (firebase.messaging.isSupported) {
      console.log(`"Las notificaciones PUSH estan soportadas c:`)
      this.messaging = firebase.messaging();
      // messaging.usePublicVapidKey("BEP7U1FCzQbCdoSbHHauqljSbs01jqHia6RiaTVIU1RrpKaF-B9d4LwyuYfKyogophhPdCoej59ylOnO7UqEvrM");
    } else {
      console.log(`No soporta PUSH :c`);
    }
  }
  // get permission to send messages
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
  async getPermission(user) {
    try {
      await this.messaging.requestPermission()
      this.permission = true;
      console.log(`Tengo Permiso de ${user}`);
      const token = await this.messaging.getToken()
      console.log(`El token del usuario es ${token}`)
      // this.guardarToken(user, token)
    }
    catch (e) {
      console.log(`Imposible obtener permiso de ${user}`, e);
    }
  }

  // Listen for token refresh
  monitorRefresh(user) {
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
        .then(refreshedToken => {
          console.log('Token refreshed.');
          this.guardarToken(user, refreshedToken)
        })
        .catch(err => console.log(err, 'Unable to retrieve new token'))
    });
  }
  // save the permission token in firestore
  private guardarToken(user, token): void {

    const currentTokens = user.fcmTokens || {}

    // If token does not exist in firestore, update db
    if (!currentTokens[token]) {
      const userRef = this.afs.collection('usuarios').doc("8uSyP89aa5a3w5AJ2jw8Xc2kvAG2")
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