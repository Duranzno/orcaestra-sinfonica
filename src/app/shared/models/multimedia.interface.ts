export enum MediaType {
  YOUTUBE = 'youtube',
  MP3 = 'mp3',
  MIDI = 'midi',
  PDF = 'pdf',
  MXML = 'musicxml',
  IMG = 'jpg/png',
  AVATAR = 'avatar',
}
export enum MediaOriginType {
  FIRESTORE = 'firestore',
  DROPBOX = 'dropbox',
  ASSETS = 'assets',
  OTHER = 'other',
}
interface Origin { url: string; type: MediaOriginType; }
export interface IMedia {
  originArray: Origin[];
  type: MediaType;
}
export class Media implements IMedia {
  originArray: Origin[];
  type: MediaType;
  constructor(i: IMedia) { this.originArray = i.originArray; this.type = i.type; }

}
export class MediaArray {
  array: Media[] = [];
  constructor(arg: Array<Media>) {
    arg.forEach(el => {
      this.array.push(el);
    });
  }
  getByType(type: MediaType) {
    return this.array.find(m => m.type === type);
  }
  getByTypeAndOrigin(type: MediaType, originType: MediaOriginType) {
    return this
      .getByType(type)
      .originArray.find(o => o.type === originType);
  }
  
}
