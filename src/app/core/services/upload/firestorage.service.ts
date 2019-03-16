import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { UploadFile, Origin, MediaType, OriginType } from '../../models';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map, last,switchMap } from 'rxjs/operators';
@Injectable()
export class FirestorageService {
    private task: AngularFireUploadTask;
    public percentage: Observable<number>;
    public snapshot: Observable<firebase.storage.UploadTaskSnapshot>;
    public downloadURL: Observable<string>;
    constructor(
        private storage: AngularFireStorage) { }
    updateMedia() { }

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
            map((url:string) => {
                console.log(`Uploaded ${uFile.file.name} to ${url}`);
                return {
                    url,
                    type: OriginType.FIREBASE
                };
            }),
        );
    }

}