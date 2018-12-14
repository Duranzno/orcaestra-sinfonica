import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import * as firebase from 'firebase/app';

// import {otherSErvice}
import {UIService} from '../shared/ui.service'
@Injectable()
export class AuthService {
	authChange = new Subject<boolean>();
	private isAuthenticated=false;

  constructor(
  	private router:Router,
  	private afAuth:AngularFireAuth,
  	private snackbar:MatSnackBar,
  	private uiService:UIService,
  ) {}

  initAuthListener(){
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.isAuthenticated=true;
        this.authChange.next(true);
        this.router.navigate(['/music-list']);
        console.log('user is authenticated')
      } else {
        this.isAuthenticated=false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
        console.log('unauthenticated')
      }
    })
    console.log('initAuthListener',this.isAuthenticated);
  }
  registerUser(authData:AuthData){
    this.uiService.loadingStateChanged.next(true);
    // this.afAuth.auth.setPersistence()
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email,authData.password)
      .then(result=>this.uiService.loadingStateChanged.next(false))
      .catch(error=>{
        this.uiService.loadingStateChanged.next(false);
        this.snackbar.open(error.message,null,{
          duration:3000
        })
      });
  }
  doGoogleLogin(){
  //   this.uiService.loadingStateChanged.next(true);
  //   let provider= new firebase.auth.GoogleAuthProvider();
  //   provider.addScope('profile')
  //   provider.addScope('email');
  //   this.afAuth.auth
  //     .signInWithPopup(provider)
  //     .then(function(r) {
  //       // let data={
  //       //   isNewUser:r.additionalUserInfo.isNewUser,
  //       //   email:r.additionalUserInfo.profile.email,
  //       //   name:r.additionalUserInfo.profile.given_name,
  //       //   family_name:r.additionalUserInfo.profile.family_name,
  //       //   verified:r.additionalUserInfo.profile.verified_email,
  //       //   isLogin:(r.operationType=="signIn")
  //       // }
  //       console.log(r);
  //       console.log(r.user)
  //       // console.log(data)
  //       this.uiService.loadingStateChanged.next(false);

  //       })
  //     .catch(error=>{
  //       this.uiService.loadingStateChanged.next(false);
  //       this.snackbar.open(error.message,null,{
  //         duration:3000
  //       })
  //     });
  }
  login(authData:AuthData){
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.snackbar.open(error.message, null, {
          duration: 3000
        });
      });
  }
  logout(){
    this.afAuth.auth.signOut();
  }
  isAuth(){
    return this.isAuthenticated;
  }
}
