import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import * as firebase from 'firebase/app';
import { UIService } from '../shared/ui.service';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/music-list']);
      } else {
        // this.trainingService.cancelSubscriptions();//KILL SUBSCRIPTIONS

        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }
  registerUser(authData: AuthData) {
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
  doGoogleLogin() {
    this.store.dispatch(new UI.StartLoading());
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    this.afAuth.auth
      .signInWithPopup(provider)
      .then(function (r) {
        console.log(r.user);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        console.error(error);
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
