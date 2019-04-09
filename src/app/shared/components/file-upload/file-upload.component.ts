import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MediaTipo, IUploadFile, MediaTipoGuesser, IElementoIcono, uMediaParser } from '../../../core/models';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() tipo: MediaTipo;
  @Output() filesEvent = new EventEmitter<IUploadFile[]>();
  isHovering: boolean;
  files: IUploadFile[] = [];
  dsArray: IElementoIcono[] = [];
  get accept(): string {
    switch (this.tipo) {
      case MediaTipo.AVATAR: return '.jpg,.jpeg,.png,.gif';
      case MediaTipo.MP3: return "audio/*";
      default: return '.mp3,.jpg,.jpeg,.png,.gif,.pdf,.musicxml, .mxl,.xml,.pdf, .mid,.midi';
    }
  }
  get capture(): string {
    switch (this.tipo) {
      case MediaTipo.AVATAR: return 'user';
      case MediaTipo.MP3: return '';
      default: return '';
    }
  }
  preview(files) { console.log(JSON.stringify(files)) }
  get isAvatar() { return this.tipo && this.tipo === MediaTipo.AVATAR; }
  get canUseHardware(): boolean {
    const respuesta = (document.createElement("input") as any).capture !== undefined;
    // console.log(respuesta ? 'Se puede usar hardware' : 'No se puede usar hardware');
    return respuesta;
  }
  captureAudio() {
    document.getElementById("captureAudio").click();
  }
  constructor() {
  }

  addFiles(event: FileList) {
    console.log(event);
    if (this.isAvatar) {
      this.files = [{ 'archivo': event[0], 'tipo': this.tipo }];
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
    // alert(JSON.stringify(this.files));
  }
  toggleHover(event: boolean) { this.isHovering = event; }
  openInput() { document.getElementById('file-input').click(); }
}
