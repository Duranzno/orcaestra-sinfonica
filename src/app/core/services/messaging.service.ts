import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app'
import 'firebase/messaging';
import { Subject } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { UserService } from './firebase/user.service';
import { IUser } from '../models';
import { UIService } from './ui.service';


@Injectable()
export class MessagingService {

  private messaging;
  private messageSource = new Subject()
  currentMessage = this.messageSource.asObservable()

  constructor(
    private swUpdate: SwUpdate,
    private uiService: UIService) { }
  init() {
    if (environment.production) {
      if (window && this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe((event) => {
          (confirm('Nueva version de Orcaestra Sinfonica Disponible.¿Quiere descargarla?')) ? window.location.reload() : '';
        })
      }
      if (firebase.messaging.isSupported) {
        console.log(`"Las notificaciones PUSH estan soportadas c:`)
        this.messaging = firebase.messaging();
        this.getPermission().then(_ => {
          this.receiveMessages();
          console.log("A la espera de recibir mensajes")
        });
      } else {
        console.log(`No soporta PUSH :c`);
      }
    }
    else { console.log(`Desactivadas las notificaciones PUSH y los service workers`); }
  }
  async getPermission(user?: IUser): Promise<void> {
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

  monitorRefresh(user?: IUser): Promise<string> {
    return this.messaging.onTokenRefresh(async () => await this.messaging.getToken());
  }


  receiveMessages() {
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload);
      this.uiService.showSnackbar((payload) ? payload.data["gcm.notification.text"] : 'GUA');
      this.messageSource.next(payload)
    });
  }

}