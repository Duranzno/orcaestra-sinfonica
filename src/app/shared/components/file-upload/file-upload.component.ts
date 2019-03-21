import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MediaTipo, IUploadFile, MediaTipoGuesser, IElementoIcono, uMediaParser } from 'src/app/core/models';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() type: MediaTipo;
  @Output() filesEvent = new EventEmitter<IUploadFile[]>();
  isHovering: boolean;
  files: IUploadFile[] = [];
  dsArray: IElementoIcono[] = [];
  get accept(): string {
    return (this.isAvatar)
      ? '.jpg,.jpeg,.png,.gif'
      : '.mp3,.jpg,.jpeg,.png,.gif,.pdf,.musicxml, .mxl,.xml,.pdf, .mid,.midi';
  }
  get isAvatar() { return this.type && this.type === MediaTipo.AVATAR; }

  constructor() {
  }

  addFiles(event: FileList) {
    if (this.isAvatar) {
      this.files = [{ 'archivo': event[0], 'tipo': this.type }];
    } else {
      for (let i = 0; i < event.length; i++) {
        this.files.push({ 'archivo': event[i], 'tipo': MediaTipoGuesser(event[i]) });
      }
      this.dsArray = uMediaParser(this.files);
    }
    this.done()
  }
  done() {
    this.filesEvent.emit(this.files);
    alert(JSON.stringify(this.files));
  }
  toggleHover(event: boolean) { this.isHovering = event; }
  openInput() { document.getElementById('file-input').click(); }
}
