import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MediaOriginType, Score, User, MediaType } from '../../models';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input('type')
  type: MediaType;
  @Input('data')
  data: Score | User;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<firebase.storage.UploadTaskSnapshot>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  stuff() {
    console.log(this.snapshot);
  }
  startUpload(event: FileList) {
    console.log(this.type);
    console.log(this.data);
    const file = event.item(0);
    // if (file.type.split('/')[0] !== 'image') {
    //   console.error(`unsupported file type`);
    //   return;
    // }
    let path: string;

    switch (this.type) {
      case MediaType.AVATAR:
        console.log(this.type);
        console.log(this.type === MediaType.AVATAR);
        if (this.data instanceof User
          && file.type.split('/')[0] === 'image') {
          path = `test/${this.type}/${this.data.nombre}-${this.data.apellido}`;
        }
        break;
      case MediaType.MP3:
      case MediaType.IMG:
      case MediaType.MIDI:
      case MediaType.MXML:
      case MediaType.PDF:
        if (this.data instanceof Score) {
          path = `test/${this.type}/${this.data.generos[0]}/${this.data.obra}/`;
        }
        break;
      case MediaType.YOUTUBE:
        console.log('youtube no se guarda');
        break;
      default:
        console.log('error', this.type);
        break;
    }
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    this.task = this.storage.upload(path, file, { customMetadata });
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    const fileRef = this.storage.ref(path);
    this.downloadURL = (this.type === MediaType.AVATAR || this.type === MediaType.IMG)
      ? fileRef.getDownloadURL()
      : of('assets/file.png');
  }
  openInput() {
    // your can use ElementRef for this later
    document.getElementById('file-input').click();
  }
  // Determines if the upload task is active
  isActive(snapshot: firebase.storage.UploadTaskSnapshot) {
    if (typeof snapshot === 'undefined' || snapshot == null) { return false; }
    return snapshot.state === 'running'
      && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  snapshotState(snapshot: firebase.storage.UploadTaskSnapshot) {
    if (typeof snapshot === 'undefined' || snapshot == null) { return 'notrunning'; }
    else if (snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes) { return 'running'; }
    else if (snapshot.state === 'success') { return 'success'; }
    else { return 'notrunning'; }
  }

}
