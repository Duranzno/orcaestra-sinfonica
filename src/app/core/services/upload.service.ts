import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

const url = '';

@Injectable({ providedIn: 'root' })
export class UploadService {

  constructor(
    private http: HttpClient,
    private db: AngularFirestore) { }

  uploadScore(score) {
    this.db
      .collection('partituras')
      .add({ score })
      .then(docRef => console.log('Document written with ID: ', docRef.id))
      .catch(error => console.error('Error adding document: ', error));
  }
  // public upload2(files: Set<File>): { [key: string]: Observable<number> } {
  //   const status = {};    // this will be the our resulting map

  //   files.forEach(file => {// create a new multipart-form for every file
  //     const formData: FormData = new FormData();
  //     formData.append('file', file, file.name);
  //     console.log(file, formData); // !DELETE
  //     // create a http-post request and pass the form and tell it to report the upload progress
  //     const req = new HttpRequest('POST', url, formData, { reportProgress: true });

  //     const progress = new Subject<number>(); // create a new progress-subject for every file


  //     const startTime = new Date().getTime(); // send the http-request and subscribe for progress-updates

  //     this.http.request(req).subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress) {// calculate the progress percentage
  //         const percentDone = Math.round((100 * event.loaded) / event.total); // pass the percentage into the progress-stream
  //         progress.next(percentDone);
  //       } else if (event instanceof HttpResponse) {
  //         // Close the progress-stream if we get an answer form the API
  //         // The upload is complete
  //         progress.complete();
  //       }
  //     });

  //     // Save every progress-observable in a map of all observables
  //     status[file.name] = {
  //       progress: progress.asObservable()
  //     };
  //   });

  //   // return the map of progress.observables
  //   return status;
  // }
}
