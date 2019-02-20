import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { User, UploadFile } from '../models';

import { OrcaState, from as From } from '../store';
import { switchMap, catchError } from 'rxjs/operators';


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
              this.store.dispatch(new From.auth.SetAuthenticated(<User>user)));
          this.router.navigate(['/welcome']);
        } else {
          // this.trainingService.cancelSubscriptions();//TODO KILL SUBSCRIPTIONS
          this.store.dispatch(new From.auth.SetUnauthenticated());
          this.router.navigate(['/signup']);
        }
      });
  }
  fetchGrupos() {
    this.afStore.collection('categories').valueChanges()
      .subscribe(json => {
        this.store.dispatch(new From.music.SetGrupos(json[0]['grupos']));
      });
  }
  async registerUser(user: User, files?: UploadFile[]) {
    this.store.dispatch(new From.ui.StartLoading());
    try {
      // const loggedUser = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      // this.afAuth.auth.setPersistence('local');
      if (files) {
        this.store.dispatch(new From.media.PostAvatarF({ file: files[0], user: user }));
      }
      // await this.updateUserData(loggedUser.user.uid, user);
      this.store.dispatch(new From.auth.SetAuthenticated(user));
    } catch (error) {
      this.snackbar.open(error.message, null, { duration: 3000 });
      console.log(error.message);
    }
    this.store.dispatch(new From.ui.StopLoading());
  }

  login(user: User) {
    this.afAuth.auth.setPersistence('local');
    this.store.dispatch(new From.ui.StartLoading());
    from(this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password))
      .pipe(
        switchMap(f => { console.log(f); return this.fetchUserData(f.user.uid); }),
        catchError(this.errorHandlerRx)
      )
      .subscribe(finalUser => this.store.dispatch(new From.auth.SetAuthenticated(finalUser as User)));
  }
  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch(new From.auth.SetUnauthenticated);
  }
  private updateUserData(uid: string, data: User): Observable<void> {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`usuarios/${uid}`);
    return from(userRef.set(data, { merge: true }));
  }
  private fetchUserData(uid: string) {
    return from(this.afStore.doc(`usuarios/${uid}`).valueChanges());
  }
  private errorHandler(error) {
    this.snackbar.open(error.message, null, { duration: 3000 });
    console.error(error.message);
  }
  private errorHandlerRx() {
    return of(error => {
      this.snackbar.open(error.message, null, { duration: 3000 });
      console.error(error.message);
    });
  }

}
