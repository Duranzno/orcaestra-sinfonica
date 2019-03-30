import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { User, IUser } from '../../models';
import { switchMap, last, map } from 'rxjs/operators';
@Injectable()
export class UserService {
  uid: string;
  organization = "OSJIG"
  constructor(private afStore: AngularFirestore) {
  }
  updateUserData(uid: string, data: User): Observable<User> {
    let b = Object.assign({}, data)
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`usuarios/${uid}`);
    return <Observable<User>>from(userRef.set(Object.assign({}, data), { merge: true }))
      .pipe(
        last(),
        switchMap(_ => of(data))
      );
  }
  updateData(uid: string, data: any): Observable<{}> {

    const userRef: AngularFirestoreDocument<{}> = this.afStore.doc(`usuarios/${uid}`);
    return <Observable<{}>>from(userRef.update(data))
      .pipe(
        last(),
        switchMap(_ => of(data))
      );
  }
  fetchUserData(uid: string) {
    return from(this.afStore.doc(`usuarios/${uid}`).valueChanges());
  }
  fetchUserRef(uid: string) {
    return this.afStore.doc(`usuarios/${uid}`)
  }
  saveFCMToken(uid: string, newToken: string): Observable<boolean> {
    // const currentTokens = data.fcmTokens || {}
    // console.log(`Tokens actuales ${JSON.stringify(currentTokens)}. \n Nuevo token ${newToken} }`)
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`usuarios/${uid}`);
    return userRef.valueChanges()
      .pipe(
        map(
          ({ fcmTokens: oldTokens }) =>
            (oldTokens && !oldTokens[newToken]) ? { ...oldTokens, [newToken]: true } : { [newToken]: true }),
        //If any tokens have been saved it will add the new one, else it will make a new property with just the new token
        switchMap((tokens) => (tokens)
          ? from(
            userRef.update({ fcmTokens: tokens })
              .then(() => true)
              .catch(() => false))
          : of(false)))
    // const userRef = this.userService.fetchUserRef(data.uid);
    // const tokens = { ...currentTokens, [newToken]: true }
    // userRef.update({ fcmTokens: tokens }).then(_ => { console.log("actualizado") }).catch(err => console.error(`error`, err))
  }
}