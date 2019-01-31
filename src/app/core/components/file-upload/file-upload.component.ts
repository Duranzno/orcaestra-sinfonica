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

  isHovering: boolean;

  constructor(private db: AngularFirestore) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  startUpload(event: FileList) {
    const file = event.item(0);
    // if (file.type.split('/')[0] !== 'image') {
    //   console.error(`unsupported file type`);
    //   return;
    // }


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
