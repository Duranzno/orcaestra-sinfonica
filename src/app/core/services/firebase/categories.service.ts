import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { firestore } from 'firebase';
import { CategoriaTipo } from '../../models';

@Injectable()
export class CategoriesService {
    constructor(private db: AngularFirestore) { }
    // Categ Functions
    fetchCateg(): Observable<{ generos: string[], grupos: string[], instrumentos: string[] }> {
        return this.db.doc
            <{ generos: string[], grupos: string[], instrumentos: string[] }>
            ('categories/QuklVOu2wdKMm2YBtQm5/')
            .valueChanges();
    }
    updateCateg(categ: CategoriaTipo, nuevaCateg: string) {
        switch (categ) {
            case CategoriaTipo.GENERO:
                return from(this.db.doc(`categories/QuklVOu2wdKMm2YBtQm5/`)
                    .update({ generos: firestore.FieldValue.arrayUnion(nuevaCateg) })
                    .then(() => true)
                    .catch(() => false)
                );
            case CategoriaTipo.GRUPOS:
                return from(this.db.doc(`categories/QuklVOu2wdKMm2YBtQm5/`)
                    .update({ grupos: firestore.FieldValue.arrayUnion(nuevaCateg) })
                    .then(() => true)
                    .catch(() => false)
                );
            case CategoriaTipo.INSTRUMENTOS:
                return from(this.db.doc(`categories/QuklVOu2wdKMm2YBtQm5/`)
                    .update({ instrumentos: firestore.FieldValue.arrayUnion(nuevaCateg) })
                    .then(() => true)
                    .catch(() => false)
                );
        }

    }

    // User Favorite Functions
    saveFavorite(userId: string, scoreId: string): Observable<boolean> {
        // VOY A ACTUALIZAR Y AGREGAR A UN ARRAY DENTRO DE SCOREID EL USUARIO
        // this.db.collection<IScore>
        return from(this.db.doc(`partituras/${scoreId}`)
            .update({ suscriptores: firestore.FieldValue.arrayUnion(userId) })
            .then(() => true)
            .catch((e) => false)
        );
    }
    deleteFavorite(userId: string, scoreId: string): Observable<boolean> {
        // VOY A ACTUALIZAR Y AGREGAR A UN ARRAY DENTRO DE SCOREID EL USUARIO
        // this.db.collection<IScore>
        return from(this.db.doc(`partituras/${scoreId}`)
            .update({ suscriptores: firestore.FieldValue.arrayRemove(userId) })
            .then(() => true)
            .catch((e) => false)
        );
    }
}