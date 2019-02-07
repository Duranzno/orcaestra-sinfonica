import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MediaType, UploadFile, MediaTypeGuesser } from '../../models';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input('type')
  type: MediaType;
  @Output()
  filesEvent = new EventEmitter<UploadFile[]>();
  snapshot;
  private isHovering: boolean;

  constructor() { }
  accept(): string {
    return (this.isAvatar())
      ? '.jpg,.jpeg,.png,.gif'
      : '.mp3,.jpg,.jpeg,.png,.gif,.pdf,.musicxml, .mxl,.xml,.pdf, .mid,.midi';
  }

  toggleHover(event: boolean) { this.isHovering = event; }

  openInput() { document.getElementById('file-input').click(); }

  filesReady(event: FileList) {
    let files: UploadFile[] = [];
    if (!this.isAvatar()) {
      for (let i = 0; i < event.length; i++) {
        files.push({ 'file': event[i], 'type': MediaTypeGuesser(event[i]) });
      }
    }
    else {
      files = [{ 'file': event[0], 'type': this.type }];
    }
    this.filesEvent.emit(files);
  }
  isAvatar() {
    return this.type && this.type === MediaType.AVATAR;
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
