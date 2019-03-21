import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { User, IUploadFile, IUser } from '../models';

import { OrcaState, From } from '../store';
import { switchMap, catchError, map, last } from 'rxjs/operators';


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
          this.router.navigate(['/bienvenida']);
        } else {
          // this.trainingService.cancelSubscriptions();//TODO KILL SUBSCRIPTIONS
          this.store.dispatch(new From.auth.SetUnauthenticated());
          this.router.navigate(['/signup']);
        }
      });
  }

  registerUser(user: User, file?: IUploadFile) {
    this.store.dispatch(new From.ui.StartLoading());
    from(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password))
      .pipe(
        switchMap(f => { console.log(f); return this.updateUserData(f.user.uid, user); }),
      )
      .subscribe(finalUser => {
        if (file) { this.store.dispatch(new From.media.PostAvatar({ file, user: new User(finalUser) })); }
        this.store.dispatch(new From.ui.StopLoading());
        this.store.dispatch(new From.auth.SetAuthenticated(finalUser as User));
        this.router.navigate(['/bienvenida']);
      });
  }

  login(user: IUser) {
    this.store.dispatch(new From.ui.StartLoading());
    from(this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password))
      .pipe(
        switchMap(f => this.fetchUserData(f.user.uid)),
        catchError(this.errorHandlerRx)
      )
      .subscribe(finalUser => {
        this.store.dispatch(new From.ui.StopLoading());
        this.store.dispatch(new From.auth.SetAuthenticated(finalUser as User));
        this.router.navigate(['/bienvenida']);
      });
  }
  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch(new From.auth.SetUnauthenticated);
  }
  private updateUserData(uid: string, data: User): Observable<User> {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`usuarios/${uid}`);
    return from(userRef.set(data, { merge: true })).pipe(last(), switchMap(_ => of(data)));
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
