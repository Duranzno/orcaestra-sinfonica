export interface User {
  email: string;
  userId: string;
  nombre:string;
  apellido:string;
  esAdmin:boolean;
  suscripciones:any[];
  grupo:any;
}
