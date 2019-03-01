import { IUploadFile, UploadFile } from './upload.media.interface';

export enum MediaType {
  YOUTUBE = 'youtube',
  MP3 = 'mp3',
  MIDI = 'midi',
  PDF = 'pdf',
  MXML = 'musicxml',
  IMG = 'jpg/png',
  AVATAR = 'avatar',
}
export function MediaTypeGuesser(file: File): MediaType {
  console.log(file.name.toLowerCase().split('.').pop());
  switch (file.name.toLowerCase().split('.').pop()) {
    case 'mp3':
      return MediaType.MP3;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return MediaType.IMG;

    case 'pdf':
      return MediaType.PDF;

    case 'musicxml':
    case 'mxl':
    case 'xml':
      return MediaType.MXML;

    case 'mid':
    case 'midi':
      return MediaType.MIDI;

    default:
      return MediaType.YOUTUBE;
  }
}

export enum OriginType {
  FIREBASE = 'firestore',
  DROPBOX = 'dropbox',
  ASSETS = 'assets',
  OTHER = 'other',
}
export interface Origin {
  url: string;
  type: OriginType;
}
export interface IMedia {
  originArray: Origin[];
  type: MediaType;
}
export class Media implements IMedia {
  originArray: Origin[];
  type: MediaType;
  constructor(i: IMedia) {
    this.originArray = i.originArray;
    this.type = i.type;
  }
  isMedia(arg: any): arg is IMedia {
    return (arg.type !== undefined) && (arg.originArray !== undefined);
  }
  addOrigin(o: Origin) { this.originArray.push(o); }
}
