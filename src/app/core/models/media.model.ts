import { IInstr } from './instr.interface';
export enum MediaTipo {
  YOUTUBE = 'youtube',
  MP3 = 'mp3',
  MIDI = 'midi',
  PDF = 'pdf',
  MXML = 'mxml',
  IMG = 'jpg/png',
  AVATAR = 'avatar',
}
export function MediaTipoGuesser(archivo: File): MediaTipo {
  switch (archivo.name.toLowerCase().split('.').pop()) {
    case 'mp3':
      return MediaTipo.MP3;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return MediaTipo.IMG;

    case 'pdf':
      return MediaTipo.PDF;

    case 'musicxml':
    case 'mxl':
    case 'xml':
      return MediaTipo.MXML;

    case 'mid':
    case 'midi':
      return MediaTipo.MIDI;

    default:
      return MediaTipo.YOUTUBE;
  }
}

export enum OrigenTipo {
  FIREBASE = 'firestore',
  DROPBOX = 'dropbox',
  ASSETS = 'assets',
  OTROS = 'other',
}
export interface Origen {
  url: string;
  tipo: OrigenTipo;
}
export interface IMedia {
  origenArray: Origen[];
  instr?: IInstr;
  tipo: MediaTipo;
}
export class Media implements IMedia {
  origenArray: Origen[];
  instr?: IInstr;
  tipo: MediaTipo;
  constructor(i: IMedia) {
    this.origenArray = (i.origenArray) ? i.origenArray : [];
    this.instr = (i.instr) ? i.instr : null;
    this.tipo = (i.tipo) ? i.tipo : null;
  }
  isMedia(arg: any): arg is IMedia {
    return (arg.type !== undefined) && (arg.originArray !== undefined);
  }
  addOrigen(o: Origen) { this.origenArray.push(o); }
}
export function CardMedia(media: Media[]): Media[] {
  return media.filter(m => {
    return m.tipo === MediaTipo.MIDI
      || m.tipo === MediaTipo.MP3
      || m.tipo === MediaTipo.YOUTUBE
      || m.tipo === MediaTipo.PDF;
  });
}
