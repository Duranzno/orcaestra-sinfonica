import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { IUploadFile, Origen, MediaTipo, OrigenTipo } from '../../models';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map, last, switchMap } from 'rxjs/operators';
@Injectable()
export class FirestorageService {
  private task: AngularFireUploadTask;
  public percentage: Observable<number>;
  public snapshot: Observable<firebase.storage.UploadTaskSnapshot>;
  public downloadURL: Observable<string>;
  constructor(
    private storage: AngularFireStorage) { }
  updateMedia() { }

  upload(uFile: IUploadFile, path: string): Observable<Origen> {
    if (uFile.tipo === MediaTipo.YOUTUBE) {
      return of({
        url: uFile.archivo.name,
        tipo: OrigenTipo.FIREBASE,
      });
    }
    const customMetadata = { app: 'CUSTOM METADATA BIAATCH!' };
    this.task = this.storage.upload(<string>path, uFile.archivo, { customMetadata });
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    const ref = this.storage.ref(<string>path);
    return this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => <Observable<string>>(ref.getDownloadURL())),
      map((url: string) => {
        console.log(`Uploaded ${uFile.archivo.name} to ${url}`);
        return {
          url,
          tipo: OrigenTipo.FIREBASE
        };
      }),
    );
  }

}