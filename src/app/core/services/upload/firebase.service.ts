import { Injectable } from '@angular/core';
import { MediaType, User, Score } from '../../models';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { OrcaState, From } from '../../store';
import { Store } from '@ngrx/store';
import { last, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class FbStorageService {
  private task: AngularFireUploadTask;
  public percentage: Observable<number>;
  public snapshot: Observable<firebase.storage.UploadTaskSnapshot>;
  public downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage, private store: Store<OrcaState>) { }
  upload(type: MediaType, data: User | Score, file: File) {
    const path = this.setPath(type, data);
    const customMetadata = { app: 'CUSTOM METADATA BIAATCH!' };
    this.task = this.storage.upload(<string>path, file, { customMetadata });
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    const fileRef2 = this.storage.ref(<string>path);
    return <Observable<string>>this.task.snapshotChanges().pipe(
      last(),
      switchMap(_ => {
        const url = fileRef2.getDownloadURL();
        return url;
      })
    );
  }
  private setPath(type: MediaType, data: User | Score): string | Error {
    switch (type) {
      case MediaType.AVATAR:
        return `OSJIG/avatar/${(<User>data).email}`;
      case MediaType.MP3:
      case MediaType.IMG:
      case MediaType.MIDI:
      case MediaType.MXML:
      case MediaType.PDF:
        if (data instanceof Score) {
          return `OSJIG/musica/${data.generos[0]}/${data.obra}/`;
        }
        break;
      case MediaType.YOUTUBE:
        return new Error('A youtube no se suben archivos');
      default:
        return new Error('No hay posible path');
    }
  }
}
