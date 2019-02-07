import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MediaOriginType, Score, User, MediaType } from '../../models';
import { FbStorageService } from '../../services/upload/firebase.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input()
  type: MediaType;
  @Input()
  data: Score | User;
  snapshot;
  isHovering: boolean;

  constructor(private fbStorage: FbStorageService) { this.snapshot = this.fbStorage.snapshot; }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  startUpload(event: FileList) {
    const file = event.item(0);
    this.fbStorage.upload(this.type, this.data, file);
  }
  openInput() {
    document.getElementById('file-input').click();
  }
  isActive() {

    if (typeof this.snapshot === 'undefined' || this.snapshot == null) { return false; }
    return this.snapshot.state === 'running'
      && this.snapshot.bytesTransferred < this.snapshot.totalBytes;
  }
  snapshotState() {
    if (typeof this.snapshot === 'undefined' || this.snapshot == null) { return 'notrunning'; }
    else if (this.snapshot.state === 'running' && this.snapshot.bytesTransferred < this.snapshot.totalBytes) { return 'running'; }
    else if (this.snapshot.state === 'success') { return 'success'; }
    else { return 'notrunning'; }
  }

}
