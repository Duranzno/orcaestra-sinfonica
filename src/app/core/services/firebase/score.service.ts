import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { IScoreId, Score, CategoriaTipo } from '../../models';
import { map, tap } from 'rxjs/operators';


type Reference = firebase.firestore.CollectionReference | firebase.firestore.Query;
export interface Filter { path: CategoriaTipo | string; val: string; }

@Injectable()
export class ScoreService {

    constructor(
        private db: AngularFirestore
    ) { }
    // Individual Score
    fetchScore(scoreUID: string): Observable<IScoreId> {
        return this.db.doc<Score>(`partituras/${scoreUID}/`)
            .valueChanges()
            .pipe(map(score => (<IScoreId>{ ...score, id: scoreUID })))
    }

    saveScore(score: IScoreId): Observable<string> {
        const data = Object.assign({}, score);
        return from(this
            .db.collection('partituras')
            .add(JSON.parse(JSON.stringify(data)))
            .then(docRef => { console.log('Document written with ID: ', docRef.id); return docRef.id })
            // .catch(error => { console.error('Error adding document: ', error); })
        );
    }
    updateScore(id: string, modScore: IScoreId): Observable<boolean> {
        return from(this.db.doc(`partituras/${id}`)
            .update({ ...modScore })
            .then(() => true)
            .catch(() => false)
        );
    }

    deleteScore(id: string): Observable<boolean> {
        return from(this.db.doc(`partituras/${id}`)
            .delete()
            .then(() => true)
            .catch(() => false)
        );
    }

    //Score List

    private filter = (ref: Reference, f: Filter): Reference => ref.where(f.path, 'array-contains', f.val);

    private fetchScoreList(...filters: Filter[]): AngularFirestoreCollection {
        return this.db.collection<IScoreId>('partituras', ref => {
            if (filters && filters.length) {
                return filters.reduce(this.filter, ref);
            } else {
                return ref;
            }
        });
    }
    getScoreList(...filters: Filter[]): Observable<IScoreId[]> {
        return this.fetchScoreList(...filters).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as IScoreId;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
    getFavScores(userId: string): Observable<IScoreId[]> {
        const filter = { path: 'suscriptores', val: userId }
        return this.fetchScoreList(filter).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as IScoreId;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
    getSimpleList() {
        return this.db.collection('partituras').valueChanges();
    }

}