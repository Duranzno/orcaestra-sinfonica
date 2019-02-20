import { Injectable } from '@angular/core';
import { MediaType, User, Score } from '../../models';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { OrcaState, from } from '../../store';
import { Store } from '@ngrx/store';

@Injectable()
export class FbStorageService {
  private task: AngularFireUploadTask;
  public percentage: Observable<number>;
  public snapshot: Observable<firebase.storage.UploadTaskSnapshot>;
  public downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage, private store: Store<OrcaState>) { }
  upload(type: MediaType, data: User | Score, file: File) {
    try {
      const path = this.setPath(type, data);
      const customMetadata = { app: 'CUSTOM METADATA BIAATCH!' };
      this.task = this.storage.upload(<string>path, file, { customMetadata });
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges();
      const downloadUrl: Observable<string> = this.storage.ref(<string>path).getDownloadURL();
      downloadUrl.subscribe(
        url => console.log(`dowload url ${url}`),
        e => console.error(e),
        () => {
          console.log(`completed`);
        });
      return downloadUrl;
      // this.downloadURL = (type === MediaType.AVATAR || type === MediaType.IMG)
      //   ? fileRef.getDownloadURL()
      //   : of('assets/file.png');
    }
    catch (e) { console.error(e); }
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
