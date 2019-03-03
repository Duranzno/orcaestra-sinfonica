import { MediaType } from './media.model';

export interface IUploadFile { file: File; type: MediaType; }
export class UploadFile implements IUploadFile {
  file: File; type: MediaType;
  constructor(i: IUploadFile) {
    this.file = i.file;
    this.type = i.type;
  }
}
