import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { User } from '../../models';
import { switchMap, last } from 'rxjs/operators';
@Injectable()
export class UserService {
  constructor(private afStore: AngularFirestore) { }
  updateUserData(uid: string, data: User): Observable<User> {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`usuarios/${uid}`);
    return <Observable<User>>from(userRef.set(data, { merge: true })).pipe(last(), switchMap(_ => of(data)));
  }
  fetchUserData(uid: string) {
    return from(this.afStore.doc(`usuarios/${uid}`).valueChanges());
  }
  fetchUserRef(uid:string){
   return this.afStore.collection('usuarios').doc(uid);
  }
}