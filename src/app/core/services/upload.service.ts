import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MediaType, User, Score, MediaOriginType } from '../models';
import { FbStorageService } from './upload/firebase.service';

const url = '';

@Injectable({ providedIn: 'root' })
export class UploadService {

  constructor(
    private fb: FbStorageService,
    private db: AngularFirestore) { }

  uploadScore(score) {
    this.db
      .collection('partituras')
      .add({ score })
      .then(docRef => console.log('Document written with ID: ', docRef.id))
      .catch(error => console.error('Error adding document: ', error));
  }
  upload(type: MediaType, data: User | Score, origin: MediaOriginType, file: File) {
    switch (origin) {
      case MediaOriginType.FIREBASE:
        this.fb.upload(type, data, file);
        break;
      case MediaOriginType.DROPBOX:
        console.log(`Dropbox no implementado`);
        break;
      default:
        console.error(`No se puede subir a ${MediaOriginType.ASSETS} o ${MediaOriginType.OTHER}`);
        break;
    }
  }
}
