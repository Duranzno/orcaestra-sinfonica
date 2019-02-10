import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { User, UploadFile } from '@core/models';

import { OrcaState } from '@core/store';
import * as fromUI from '@core/store/ui';
import * as fromAuth from '@core/store/auth';
import * as fromMusic from '@core/store/music';
import * as fromMedia from '@core/store/media';


@Injectable()
export class AuthService {
  user: User;
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private snackbar: MatSnackBar,
    private store: Store<OrcaState>,
    private router: Router,
  ) { }

  initAuthListener() {
    this.afAuth.authState
      .subscribe(fUser => {
        if (fUser) {
          this.fetchUserData(fUser.uid)
            .subscribe(user =>
              this.store.dispatch(new fromAuth.SetAuthenticated(<User>user)));
          this.router.navigate(['/welcome']);
        } else {
          // this.trainingService.cancelSubscriptions();//TODO KILL SUBSCRIPTIONS
          this.store.dispatch(new fromAuth.SetUnauthenticated());
          this.router.navigate(['/signup']);
        }
      });
  }
  fetchGrupos() {
    this.afStore.collection('categories').valueChanges()
      .subscribe(json => {
        this.store.dispatch(new fromMusic.SetGrupos(json[0]['grupos']));
      });
  }
  async registerUser(user: User, files?: UploadFile[]) {
    this.store.dispatch(new fromUI.StartLoading());
    try {
      const loggedUser = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      this.afAuth.auth.setPersistence('local');
      if (files) {
        await this.store.dispatch(new fromMedia.PostAvatarF({ file: files[0], user: user }));
      }
      await this.updateUserData(loggedUser.user.uid, user);
      this.store.dispatch(new fromAuth.SetAuthenticated(user));
    } catch (error) {
      this.snackbar.open(error.message, null, { duration: 3000 });
      console.log(error.message);
    }
    this.store.dispatch(new fromUI.StopLoading());
  }

  async login(user: User) {
    let loggedUser;
    this.store.dispatch(new fromUI.StartLoading());
    try {
      const { user: { uid: uid } } = await this.afAuth.auth
        .signInWithEmailAndPassword(user.email, user.password);
      this.afAuth.auth.setPersistence('local');

      console.log(uid);
      this.fetchUserData(uid).subscribe(u => {
        loggedUser = u;
        console.log(u);
      });
      this.store.dispatch(new fromAuth.SetAuthenticated(user));
    } catch (error) {
      this.snackbar.open(error.message, null, { duration: 3000 });
      console.log(error.message);

    }
    this.store.dispatch(new fromUI.StopLoading());
  }

  logout() {
    this.store.dispatch(new fromAuth.SetUnauthenticated);
    this.afAuth.auth.signOut();
  }
  private updateUserData(uid: string, data: User) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`usuarios/${uid}`);
    return userRef.set(data, { merge: true });
  }
  private fetchUserData(uid: string) {
    return this.afStore.doc(`usuarios/${uid}`).valueChanges();
  }
}
