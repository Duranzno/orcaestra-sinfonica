import { MediaType, Media } from './media.interface';
import { UploadFile } from './upload.media.interface';

export interface IUser {
  email: string;
  nombre?: string;
  apellido?: string;
  password: string;
  group?: string;
  isAdmin?: boolean;
}
export class User implements IUser {
  constructor(i: IUser) {
    this.email = this.email;
    this.nombre = this.nombre;
    this.apellido = this.apellido;
    this.password = this.password;
    this.isAdmin = this.isAdmin;
    this.group = (i.group === '') ? 'Desconocido' : this.group;
  }

  public email: string;
  public nombre: string = '';
  public apellido: string = '';
  public password: string;
  public isAdmin: boolean = false;
  public group: string = 'Desconocido';
  public avatar: string = '/assets/user.jpg';

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

