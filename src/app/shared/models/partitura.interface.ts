import { Persona } from './autor.interface';
import { IStored } from './almacenamiento.interface';


export interface IScore {
  /// Obligatorios

  // Numero  legado del sistema Anterior
  its: number;
  // Nombre de la Obra
  obra: string;
  // Interfaz para reconocer el tipo de canción
  almacenamiento: IStored[];

  generos?: string[];
  // Tipo Almacenamiento Fisico
  // Instrumentos Usados
  instrumentos?: string[];
  /// OPTIONALES
  gente?: Persona[];

  _id?: any;
  // TODO OP/K/V/HOB  =>¿Que significan?
  // Información Extra
  extrainfo?: string;
  youtube?: string;
  photoURL?: string;

}
