import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { CategoriaTipo, MediaTipo } from '../../models';
import { map, tap, switchMap, } from 'rxjs/operators';
import { fromFbPromise } from './help';

@Injectable()
export class CategoriesService {
  private organization = "OSJIG";
  constructor(private db: AngularFirestore) { 
    // this.db.enablePersistence();
     }
  // Categ Functions
  fetchCateg(): Observable<{ generos: string[], grupos: string[], instrumentos: string[] }> {
    return this.db.doc
      <{ generos: string[], grupos: string[], instrumentos: string[] }>
      (`categories/${this.organization}/`)
      .valueChanges();
  }
  updateCateg(categ: CategoriaTipo, nuevaCateg: string): Observable<boolean> {
    switch (categ) {
      case CategoriaTipo.GENERO:
        return fromFbPromise(this.db.doc(`categories/${this.organization}/`)
          .update({ generos: firebase.firestore.FieldValue.arrayUnion(nuevaCateg) }));
      case CategoriaTipo.GRUPOS:
        return fromFbPromise(this.db.doc(`categories/${this.organization}/`)
          .update({ grupos: firebase.firestore.FieldValue.arrayUnion(nuevaCateg) })
        );
      case CategoriaTipo.INSTRUMENTOS:
        return fromFbPromise(this.db.doc(`categories/${this.organization}/`)
          .update({ instrumentos: firebase.firestore.FieldValue.arrayUnion(nuevaCateg) })
        );
      default:
        console.error('updateCateg wrong categ');
        return of(false);
    }

  }
  deleteCateg(categ: CategoriaTipo, nuevaCateg: string): Observable<boolean> {
    // VOY A ACTUALIZAR Y AGREGAR A UN ARRAY DENTRO DE SCOREID EL USUARIO
    // this.db.collection<IScore>
    switch (categ) {
      case CategoriaTipo.GENERO:
        return fromFbPromise(this.db.doc(`categories/${this.organization}/`)
          .update({ generos: firebase.firestore.FieldValue.arrayRemove(nuevaCateg) }))
      case CategoriaTipo.GRUPOS:
        return fromFbPromise(this.db.doc(`categories/${this.organization}/`)
          .update({ grupos: firebase.firestore.FieldValue.arrayRemove(nuevaCateg) }))
      case CategoriaTipo.INSTRUMENTOS:
        return fromFbPromise(this.db.doc(`categories/${this.organization}/`)
          .update({ instrumentos: firebase.firestore.FieldValue.arrayRemove(nuevaCateg) }))
      default:
        console.error('updateCateg wrong categ');
        return of(false);
    }
  }
  // User Favorite Functions
  saveFavorite(userId: string, scoreId: string): Observable<boolean> {
    // VOY A ACTUALIZAR Y AGREGAR A UN ARRAY DENTRO DE SCOREID EL USUARIO
    // this.db.collection<IScore>
    return fromFbPromise(this.db.doc(`partituras/${scoreId}`)
      .update({ suscriptores: firebase.firestore.FieldValue.arrayUnion(userId) }))
  }
  deleteFavorite(userId: string, scoreId: string): Observable<boolean> {
    // VOY A ACTUALIZAR Y AGREGAR A UN ARRAY DENTRO DE SCOREID EL USUARIO
    // this.db.collection<IScore>
    return fromFbPromise(this.db.doc(`partituras/${scoreId}`)
      .update({ suscriptores: firebase.firestore.FieldValue.arrayRemove(userId) }))
  }
  subscribeCateg(userId: string, categoria: string, tipo: CategoriaTipo) {
    //Se crea la CategSubscripction en la db 
    // se agrega el usuarioId a la CategSubscription
    //en fcloud se toman los fcmToken del usuario y se agregan a la CategSubscription 
    const parentPath = `categories/${this.organization}/${tipo}`;
    return this.db.collection(parentPath, ref => ref.where('categoria', '==', categoria))
      .snapshotChanges()
      .pipe(
        tap(v => console.log(v)),
        switchMap(categs =>
          (categs.length === 0)
            ? this.addCategSub(parentPath, { categoria, suscripciones: [userId] })
            : this.createCategSub(categs.pop().payload.doc.ref.path, userId))
      )
  }
  unsubscribeCateg(userId: string, categoria: string, tipo: CategoriaTipo) {
    const parentPath = `categories/${this.organization}/${tipo}`;
    return this.db.collection(parentPath, ref => ref.where('categoria', '==', categoria))
      .snapshotChanges()
      .pipe(
        tap(v => console.log(v)),
        switchMap(categs =>
          (categs.length === 0)
            ? of(`No hay subscripcion para ${parentPath}`)
            : this.removeCategSub(categs.pop().payload.doc.ref.path, userId))
      )
  }
  private addCategSub(path: string, categSub: CategSubscription) {
    return fromFbPromise(this.db.collection(path).add(categSub))
  }
  private createCategSub(path: string, newSubscriberId: string) {
    return fromFbPromise(this.db.doc(path).update({ suscripciones: firebase.firestore.FieldValue.arrayUnion(newSubscriberId) }))
  }
  private removeCategSub(path: string, oldSubscriberId: string) {
    return fromFbPromise(this.db.doc(path).update({ suscripciones: firebase.firestore.FieldValue.arrayRemove(oldSubscriberId) }))
  }
}
export interface CategSubscription {
  categoria: string;
  suscripciones: string[];
  fcmTokens?: { [token: string]: true };
}