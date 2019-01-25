import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

import { User } from '../shared/models/user.model';
import * as firebase from 'firebase/app';
import { UIService } from '../shared/ui.service';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/redux/ui.actions';
import * as Auth from './redux/auth.actions';
import * as Music from '../list/redux/music.actions';
import { Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  user: any;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private snackbar: MatSnackBar,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {
  }

  public fetchGrupos() {
    this.afStore.collection('categories').valueChanges()
      .subscribe(json => {
        this.store.dispatch(new Music.SetGrupos(json[0]['grupos']));
      });
  }
  initAuthListener() {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.store.dispatch(new Auth.SetAuthenticated(user));
    //     // this.user = this.afStore.doc<AuthData>(`users/${user.uid}`).valueChanges();
    //     this.router.navigate(['/welcome']);
    //   } else {
    //     // this.trainingService.cancelSubscriptions();//KILL SUBSCRIPTIONS

    //     this.store.dispatch(new Auth.SetUnauthenticated());
    //     this.router.navigate(['/signup']);
    //   }
    // });
  }
  private updateUserData(uid: string, data: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`usuarios/${uid}`);
    return userRef.set(data, { merge: true });
  }
  private fetchUserData(uid: string) {
    return this.afStore.doc(`usuarios/${uid}`).valueChanges();
  }
  async registerUser(user: User) {
    this.store.dispatch(new UI.StartLoading());
    // this.afAuth.auth.setPersistence()
    try {
      const loggedUser = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      await this.updateUserData(loggedUser.user.uid, user);
      this.store.dispatch(new Auth.SetAuthenticated(user));
    } catch (error) {
      this.snackbar.open(error.message, null, { duration: 3000 });
    }
    this.store.dispatch(new UI.StopLoading());

  }

  async login(user: User) {
    let loggedUser;
    this.store.dispatch(new UI.StartLoading());
    try {
      const { user: { uid: uid } } = await this.afAuth.auth
        .signInWithEmailAndPassword(user.email, user.password);
      console.log(uid);
      this.fetchUserData(uid).subscribe(u => {
        loggedUser = u;
        console.log(u);
      });
      this.store.dispatch(new Auth.SetAuthenticated(user));
    } catch (error) {
      this.snackbar.open(error.message, null, { duration: 3000 });
    }
    this.store.dispatch(new UI.StopLoading());
  }

  logout() {
    this.store.dispatch(new Auth.SetUnauthenticated);
    this.afAuth.auth.signOut();
  }
}
