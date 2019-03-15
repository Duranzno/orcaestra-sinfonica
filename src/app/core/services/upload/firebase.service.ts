import { Injectable } from '@angular/core';
import { MediaType, User, Score, UploadFile, OriginType, Media, Origin, IScore, IScoreId } from '../../models';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, of, from } from 'rxjs';
import { OrcaState, From } from '../../store';
import { Store } from '@ngrx/store';
import { last, map, mergeMap, switchMap, finalize, tap, reduce } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { UploadInterface } from './upload.interface';
import { firestore } from 'firebase';
type Reference = firebase.firestore.CollectionReference | firebase.firestore.Query;
interface Filter { path: string; val: string; }
@Injectable()
export class FirebaseService implements UploadInterface {
  private task: AngularFireUploadTask;
  public percentage: Observable<number>;
  public snapshot: Observable<firebase.storage.UploadTaskSnapshot>;
  public downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore) { }
  // private firebasePromiseParser():Observable<IScore|IScoreId|IScore[]|IScoreId[]|string|string[]>
  // Score Functions
  fetchScore(scoreUID: string): Observable<IScore> {
    return this.db.doc<Score>(`partituras/${scoreUID}/`)
      .valueChanges();
  }

  saveScore(score: IScore): Observable<IScore> {
    const data = Object.assign({}, score);
    return from(this
      .db.collection('partituras')
      .add(JSON.parse(JSON.stringify(data)))
      .then(docRef => { console.log('Document written with ID: ', docRef.id); })
      // .catch(error => { console.error('Error adding document: ', error); })
    ).pipe(map(_ => score));
  }
  updateScore(id: string, modScore: IScore): Observable<boolean> {
    return from(this.db.doc(`partituras/${id}`)
      .update({ ...modScore })
      .then(() => true)
      .catch(() => false)
    );
  }

  // User Favorite Functions
  saveFavorite(userId: string, scoreId: string): Observable<boolean> {
    // VOY A ACTUALIZAR Y AGREGAR A UN ARRAY DENTRO DE SCOREID EL USUARIO
    // this.db.collection<IScore>
    return from(this.db.doc(`partituras/${scoreId}`)
      .update({ suscriptores: firestore.FieldValue.arrayUnion(userId) })
      .then(() => true)
      .catch(() => false)
    );
  }
  // Categ Functions
  fetchCateg(): Observable<{ generos: string[], grupos: string[], instrumentos: string[] }> {
    return this.db.doc
      <{ generos: string[], grupos: string[], instrumentos: string[] }>
      ('categories/QuklVOu2wdKMm2YBtQm5/')
      .valueChanges();
  }
  updateCateg() {}
  updateMedia() {}


  // Filter Functions
  private filter = (ref: Reference, f: Filter): Reference => ref.where(f.path, 'array-contains', f.val);
  fetchScoreList(...filters: Filter[]): AngularFirestoreCollection {
    return this.db.collection<IScore>('partituras', ref => {
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
        const data = a.payload.doc.data() as IScore;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  // File Functions
  upload(uFile: UploadFile, path: string): Observable<Origin> {
    if (uFile.type === MediaType.YOUTUBE) {
      return of({
        url: uFile.file.name,
        type: OriginType.FIREBASE,
      });
    }
    const customMetadata = { app: 'CUSTOM METADATA BIAATCH!' };
    this.task = this.storage.upload(<string>path, uFile.file, { customMetadata });
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    const ref = this.storage.ref(<string>path);
    return this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => <Observable<string>>(ref.getDownloadURL())),
      map(url => {
        console.log(`Uploaded ${uFile.file.name} to ${url}`);
        return {
          url,
          type: OriginType.FIREBASE
        };
      }),
    );
  }
}
