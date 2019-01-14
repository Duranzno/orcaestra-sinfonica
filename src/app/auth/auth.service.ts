import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

import { AuthData } from './auth-data.model';
import * as firebase from 'firebase/app';
import { UIService } from '../shared/ui.service';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import * as music from '../list/music.actions';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
const grupos = [
  'Sin Determinar',
  'Coro de Padres',
  'Inicial',
  'Preparatorio "B"',
  '"Alma Llanera"',
  'IMA',
  'IMB',
  'PMA',
  'PMB',
  'Pre-Infantil',
  'Infantil',
  'Pre Juvenil',
  'Juvenil',
  'Kinder Musical',
];
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private snackbar: MatSnackBar,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }
  public fetchGrupos() {
    this.afStore.collection('categories').valueChanges().subscribe(json => console.log(json));
    this.store.dispatch(new music.SetGrupos(grupos));
  }
  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/welcome']);
      } else {
        // this.trainingService.cancelSubscriptions();//KILL SUBSCRIPTIONS

        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/signup']);
      }
    });
  }
  registerUser(authData: AuthData) {
    console.log(authData);
    this.store.dispatch(new UI.StartLoading());
    // this.afAuth.auth.setPersistence()
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false))
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.snackbar.open(error.message, null, {
          duration: 3000
        });
      });
  }
  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.snackbar.open(error.message, null, {
          duration: 3000
        });
      });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
