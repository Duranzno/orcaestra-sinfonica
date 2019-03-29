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
    return this.afStore.collection('usuarios').doc(uid);
  }
}