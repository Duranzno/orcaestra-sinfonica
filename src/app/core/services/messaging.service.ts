import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app'
import 'firebase/messaging';
import { Subject } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { UserService } from './firebase/user.service';
import { IUser } from '../models';


@Injectable()
export class MessagingService {

  private messaging;
  private messageSource = new Subject()
  currentMessage = this.messageSource.asObservable() // message observable to show in Angular component

  constructor(
    private swUpdate: SwUpdate,
    private userService: UserService,
  ) {
    if (environment.production) {
      if (window && this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe((event) => {
          (confirm('Nueva version de Orcaestra Sinfonica Disponible.¿Quiere descargarla?')) ? window.location.reload() : '';
        })
      }
      if (firebase.messaging.isSupported) {
        console.log(`"Las notificaciones PUSH estan soportadas c:`)
        this.messaging = firebase.messaging();
        this.getPermission();
        this.receiveMessages();
      }
      else {
        console.log(`No soporta PUSH :c`);
      }
    }
    else {
      console.log(`Desactivadas las notificaciones PUSH y los service workers`);
    }
  }

  async getPermission(user?: IUser) {
    try {
      await this.messaging.requestPermission()
      console.log('Se tiene el permiso.');
      const token = await this.messaging.getToken()
      console.log('Token es', token)
      // if (user) this.saveToken(user, token)
    } catch (err) {
      console.log('No se puede pedir permiso ', err);
    }

  }
  getToken() {
    return this.messaging.getToken();
  }

  monitorRefresh(user?: IUser) {
    this.messaging.onTokenRefresh(async () => {
      try {
        const refreshedToken = await this.messaging.getToken()
        console.log('Token refrescado e.e.');
        this.saveToken(user, refreshedToken)
      } catch (err) {
        console.log(err, 'Unable to retrieve new token')
      }

    });
  }

  saveToken(user, token): void {
    if (!user) { return }
    const currentTokens = user.fcmTokens || {}
    console.log(`Tokens actuales ${JSON.stringify(currentTokens)}. 
    Nuevo token ${token} }`)

    // If token does not exist in firestore, update db
    if (!currentTokens[token] && user) {
      const userRef = this.userService.fetchUserRef(user.uid);
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

  }


}