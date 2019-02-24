import { Persona, PersonaTipo } from './autor.interface';
import { IStored } from './almacenamiento.interface';
import { MediaArray, MediaType, MediaOriginType } from './multimedia.interface';

export interface IScore {
  // TODO OP/K/V/HOB  =>¿Que significan?

  // Obligatorios
  its: number;  // Numero  legado del sistema Anterior
  obra: string;  // Nombre de la Obra
  almacenamiento: IStored[];  // Tipo Almacenamiento Fisico
  media?: MediaArray;
  /// OPTIONALES
  generos?: string[];
  instrumentos?: string[];  // Instrumentos Usados
  gente?: Persona[];
  extrainfo?: string;  // Información Extra

}
export class Score implements IScore {
  its: number;
  obra: string;
  almacenamiento: IStored[];
  media: MediaArray;
  generos?: string[];
  instrumentos?: string[];
  gente?: Persona[];
  extrainfo?: string;
  constructor(score: IScore) {
    this.its = score.its;
    this.obra = score.obra;
    this.almacenamiento = score.almacenamiento;
    this.media = score.media;
    this.generos = score.generos;
    this.instrumentos = score.instrumentos;
    this.gente = score.gente;
    this.extrainfo = score.extrainfo;
  }

  getAutor() {
    return this.gente.find(persona => persona.tipo === PersonaTipo.AUTOR);
  }
  assets(type: MediaType) {
    return this.media.getByTypeAndOrigin(type, MediaOriginType.ASSETS);
  }
  firestore(type: MediaType) {
    return this.media.getByTypeAndOrigin(type, MediaOriginType.FIREBASE);
  }
  otherUrl(type: MediaType) {
    return this.media.getByTypeAndOrigin(type, MediaOriginType.OTHER);
  }
}
