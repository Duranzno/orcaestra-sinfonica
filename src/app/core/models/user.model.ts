export interface IUser {
  email: string;
  nombre?: string;
  apellido?: string;
  password: string;
  group?: string;
  isAdmin?: boolean;
}
export class User implements IUser {
  constructor(
    public email: string = '',
    public nombre: string = '',
    public apellido: string = '',
    public password: string = '',
    public group: string = '',
    public isAdmin: boolean = false) {
  }
}

