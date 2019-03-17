import { MediaType, Media } from './media.model';
import { UploadFile } from './upload.media.interface';
import { IScoreId } from './score.model';

export interface IUser {
  email: string;
  nombre?: string;
  apellido?: string;
  password: string;
  group?: string;
  isAdmin?: boolean;
  uid?: string;
  favs?: string[];
  fcmTokens?: { [token: string]: true };

}
export class User implements IUser {
  public email: string;
  public nombre: string = '';
  public apellido: string = '';
  public password: string;
  public uid?: string = '';
  favs?: string[] = [];
  public isAdmin: boolean = false;
  public group: string = 'Desconocido';
  public avatar: string = '/assets/user.jpg';
  constructor(i: IUser) {
    this.email = i.email;
    this.nombre = i.nombre;
    this.apellido = i.apellido;
    this.password = i.password;
    this.isAdmin = i.isAdmin;
    this.uid = i.uid;
    this.favs = i.favs;
    this.group = (i.group === '') ? 'Desconocido' : this.group;
  }


  static isUser(arg: any): arg is User {
    return (arg.email !== undefined) && (arg.password !== undefined);
  }
  setPath(type: MediaType): string {
    switch (type) {
      case MediaType.AVATAR:
        return `OSJIG/avatar/${this.email}`;
      case MediaType.MP3:
      case MediaType.IMG:
      case MediaType.MIDI:
      case MediaType.MXML:
      case MediaType.PDF:
      case MediaType.YOUTUBE:
      default:
        const err = `Media ${type} no se suben archivos`;
        console.log(err);
        return err;
    }
  }
}

