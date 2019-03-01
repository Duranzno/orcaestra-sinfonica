import { Injectable } from '@angular/core';
import { MediaType, User, Score, UploadFile, OriginType, Media, Origin } from '../../models';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, of, from } from 'rxjs';
import { OrcaState, From } from '../../store';
import { Store } from '@ngrx/store';
import { last, map, mergeMap, switchMap, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadService } from './upload.interface';

@Injectable()
export class FirebaseService implements UploadService {
  private task: AngularFireUploadTask;
  public percentage: Observable<number>;
  public snapshot: Observable<firebase.storage.UploadTaskSnapshot>;
  public downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore) { }

  saveScore(score: Score): Observable<Score> {
    return of(score);
    // from(this
    //   .db.collection('partituras')
    //   .add({ score })
    //   .then(docRef => { console.log('Document written with ID: ', docRef.id); })
    //   .catch(error => { console.error('Error adding document: ', error); })
    // )
    //   .pipe(map(_ => score));

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
        return {
          url,
          type: OriginType.FIREBASE
        };
      })
    );
  }
  addFilesToScore(score: Score, files: UploadFile[]): Observable<Score> {
    score.media = files.reduce((mediaArr: Media[], file) => {
      const url: string = <string>this.setPath(file.type, score); // <string>this.upload(file, score);
      mediaArr.push(this.fileParser(file, url));
      return mediaArr;
    }, []);
    return of(score);
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
  setPath(type: MediaType, data: User | Score): string | Error {
    switch (type) {
      case MediaType.AVATAR:
        if (data instanceof User) {
          return `OSJIG/avatar/${(<User>data).email}`;
        } else {
          return new Error('MediaType is Avatar but data is not user');
        }
      case MediaType.MP3:
      case MediaType.IMG:
      case MediaType.MIDI:
      case MediaType.MXML:
      case MediaType.PDF:
        // const autor = (data as Score).getAutor();
        // if (autor) {
        //   if (autor.apellido.length > 0) {
        //     return `OSJIG/musica/${autor.apellido}/${autor.nombre}/`;
        //   } else {
        //     return `OSJIG/musica/${autor.nombre}/`;
        //   }
        // } else {
        return `OSJIG/musica/${(data as Score).obra}/`;
      // }
      // break;
      case MediaType.YOUTUBE:
        return new Error('A youtube no se suben archivos');
      default:
        return new Error('No hay posible path');
    }
  }
}
