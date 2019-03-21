export enum PersonaTipo {
  AUTOR = 'Autor',
  ARREGLISTA = 'Arreglista',
  ADAPTADOR = 'Adaptador',
  ORQUESTADOR = 'Orquestador',
  EDITOR = 'Editor',
  TRANSCRIPTOR = 'Transcriptor',
  UPLOADER = 'Persona que lo subió',
}
export interface Persona {
  nombre: string;
  tipo: PersonaTipo;
  apellido?: string;
  uid?: string ;
}
