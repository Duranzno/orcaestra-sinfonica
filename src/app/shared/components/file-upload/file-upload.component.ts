import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MediaType, UploadFile, MediaTypeGuesser } from 'src/app/core/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { From, OrcaState } from 'src/app/core/store';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() type: MediaType;
  @Output() filesEvent = new EventEmitter<UploadFile[]>();
  isHovering: boolean;
  files: UploadFile[] = [];

  constructor() { }

  addFiles(event: FileList) {
    if (this.isAvatar()) {
      this.files = [{ 'file': event[0], 'type': this.type }];
    } else {
      for (let i = 0; i < event.length; i++) {
        this.files.push({ 'file': event[i], 'type': MediaTypeGuesser(event[i]) });
      }
    }
    // this.filesEvent.emit(this.files);
  }
  accept(): string {
    return (this.isAvatar())
      ? '.jpg,.jpeg,.png,.gif'
      : '.mp3,.jpg,.jpeg,.png,.gif,.pdf,.musicxml, .mxl,.xml,.pdf, .mid,.midi';
  }
  toggleHover(event: boolean) { this.isHovering = event; }
  openInput() { document.getElementById('file-input').click(); }
  isAvatar() { return this.type && this.type === MediaType.AVATAR; }
}
