import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { User, IUploadFile, IUser } from '../models';

import { OrcaState, From } from '../store';
import { switchMap } from 'rxjs/operators';
import { UserService } from './firebase/user.service';
import { UIService } from './ui.service';


@Injectable()
export class AuthService {
  user: User;
  constructor(
    private afAuth: AngularFireAuth,
    private fbUser: UserService,
    private uiService: UIService,
    private store: Store<OrcaState>,
    private router: Router,
  ) { }
  initAuthListener() {
    this.afAuth.authState
      .subscribe(fUser => {
        if (fUser) {
          this.fbUser.fetchUserData(fUser.uid)
            .subscribe(user =>
              this.store.dispatch(new From.auth.SetAuthenticated(<User>user)));
          this.router.navigate(['/']);
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
        switchMap(f => {
          console.log(f);
          return this.fbUser.updateUserData(f.user.uid, user);
        }))
      .subscribe(
        finalUser => {
          if (file) { this.store.dispatch(new From.media.PostAvatar({ file, user: new User(finalUser as User) })); }
          this.store.dispatch(new From.ui.StopLoading());
          this.store.dispatch(new From.auth.SetAuthenticated(finalUser as User));
          this.router.navigate(['/']);
        },
        (error) => this.errorHandler(error)
      );
  }

  login(user: IUser) {
    this.store.dispatch(new From.ui.StartLoading());
    from(this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password))
      .pipe(
        switchMap(f => {
          this.store.dispatch(new From.auth.SetId(f.user.uid));
          return this.fbUser.fetchUserData(f.user.uid)
        })
      )
      .subscribe(
        finalUser => {
          this.store.dispatch(new From.ui.StopLoading());
          this.store.dispatch(new From.auth.SetAuthenticated(finalUser as User));
          this.router.navigate(['/']);
        },
        (error) => this.errorHandler(error)
      );
  }
  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch(new From.auth.SetUnauthenticated);
  }


  private errorHandler(error) {

    this.store.dispatch(new From.ui.StopLoading())
    this.uiService.showSnackbar(this.messageParser(error.code), 5)
    console.error(this.messageParser(error.code), error);
  }
  private messageParser(code: string): string {
    switch (code) {
      case 'auth/app-deleted': return 'Aplicacion eliminada';
      case 'auth/user-not-found': return 'No existe el usuario';
      case 'auth/account-exists-with-different-credential ':
      case "auth/email-already-in-use": return 'Ya existe un usuario con ese correo electronico';
      case 'auth/network-request-failed': return 'Problemas con la Conexión a Internet';

      default:
        return code;
    }
  }
}
