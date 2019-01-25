export interface User {
  email: string;
  nombre?: string;
  apellido?: string;
  password: string;
  group?: string;
  isAdmin?: boolean;
}
