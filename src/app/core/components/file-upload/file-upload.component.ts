import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MediaType, UploadFile, MediaTypeGuesser } from '../../models';
import { of, Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import * as fromMedia from '../../store/media';
import { Store } from '@ngrx/store';
import { OrcaState } from '../../store';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input('type')
  type: MediaType;
  @Output()
  filesEvent = new EventEmitter<UploadFile[]>();
  snapshot: Observable<any>; // TODO Must take snapshot out of the service through redux;
  sn: { state: string } = { state: 'DEFAULT' };
  isHovering: boolean;

  constructor(
    private store: Store<OrcaState>
  ) { }
  accept(): string {
    return (this.isAvatar())
      ? '.jpg,.jpeg,.png,.gif'
      : '.mp3,.jpg,.jpeg,.png,.gif,.pdf,.musicxml, .mxl,.xml,.pdf, .mid,.midi';
  }
  ngOnInit() {
    this.snapshot = this.store.select(fromMedia.getSnapshot);
    this.sn.state = 'ERROR';
  }
  toggleHover(event: boolean) { this.isHovering = event; }

  openInput() {
    document.getElementById('file-input').click();
    this.sn.state = 'PAUSED';
    // this.store.dispatch(new fromMedia.UpdateMediaSnapshot({ downloadURL: '', state: 'PAUSED' }));
  }

  filesReady(event: FileList) {
    let files: UploadFile[] = [];
    if (this.isAvatar()) {
      files = [{ 'file': event[0], 'type': this.type }];
    }
    else {
      for (let i = 0; i < event.length; i++) {
        files.push({ 'file': event[i], 'type': MediaTypeGuesser(event[i]) });
      }
    }
    this.filesEvent.emit(files);
  }
  isAvatar() {
    return this.type && this.type === MediaType.AVATAR;
  }
  // isActive(snapshot: firebase.storage.UploadTaskSnapshot) {
  //   if (typeof snapshot === 'undefined' || snapshot == null) { return false; }
  //   return snapshot.state === 'running'
  //     && snapshot.bytesTransferred < snapshot.totalBytes;
  // }
  // snapshotState(snapshot: firebase.storage.UploadTaskSnapshot) {
  //   if (typeof snapshot === 'undefined' || snapshot == null) { return 'notrunning'; }
  //   else if (snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes) { return 'running'; }
  //   else if (snapshot.state === 'success') { return 'success'; }
  //   else { return 'notrunning'; }
  // }
}
