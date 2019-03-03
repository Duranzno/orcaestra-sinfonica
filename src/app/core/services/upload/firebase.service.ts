import { Injectable } from '@angular/core';
import { MediaType, User, Score, UploadFile, OriginType, Media, Origin, IScore } from '../../models';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, of, from } from 'rxjs';
import { OrcaState, From } from '../../store';
import { Store } from '@ngrx/store';
import { last, map, mergeMap, switchMap, finalize, tap, reduce } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadInterface } from './upload.interface';

@Injectable()
export class FirebaseService implements UploadInterface {
  private task: AngularFireUploadTask;
  public percentage: Observable<number>;
  public snapshot: Observable<firebase.storage.UploadTaskSnapshot>;
  public downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore) { }

  saveScore(score: IScore): Observable<IScore> {
    const data = Object.assign({}, score);
    return from(this
      .db.collection('partituras')
      .add(JSON.parse(JSON.stringify(data)))
      .then(docRef => { console.log('Document written with ID: ', docRef.id); })
      // .catch(error => { console.error('Error adding document: ', error); })
    ).pipe(map(_ => score));
  }

  upload(file: UploadFile, path: string): Observable<Origin> {
    const customMetadata = { app: 'CUSTOM METADATA BIAATCH!' };
    this.task = this.storage.upload(<string>path, file.file, { customMetadata });
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    const ref = this.storage.ref(<string>path);
    return this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => <Observable<string>>(ref.getDownloadURL())),
      map(url => {
        console.log(`Uploaded ${file.file.name} to ${url}`);
        return {
          url,
          type: OriginType.FIREBASE
        };
      }),
    );
  }
  updateScore(id: string) {

  }
  private fileParser(file: UploadFile, url: string): Media {
    return new Media({
      originArray: [{
        url: url,
        type: OriginType.FIREBASE,
      }],
      type: file.type
    });
  }

}
