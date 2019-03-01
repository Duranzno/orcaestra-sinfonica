import { Persona, PersonaTipo } from './autor.interface';
import { IStored } from './almacenamiento.interface';
import { MediaType, Media, Origin, OriginType } from './media.interface';

export interface IScore {
  // TODO OP/K/V/HOB  =>¿Que significan?

  // Obligatorios
  its: number;  // Numero  legado del sistema Anterior
  obra: string;  // Nombre de la Obra
  almacenamiento: IStored[];  // Tipo Almacenamiento Fisico
  media?: Media[];
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
  media: Media[];
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
  // getByOrigin(oType: OriginType): Media[] {
  //   return this.media.filter(p =>
  //     p.originArray.some(o => o.type === oType)
  //   );
  // }
  getByMediaOrigin(mType: MediaType, oType: OriginType): Origin[] {
    return this
      .media.find(m => m.type === mType)
      .originArray.filter(o => o.type === oType);
  }
  getByMedia(mType: MediaType): Media[] {
    return this.media.filter(m => m.type === mType);
  }
  addMediaOrigin(type: MediaType, origin: Origin) {
    const arr = this.media.filter(m => m.type === type);
    if (arr.length === 1) {
      // Ya existe ese tipo en la base de datos
      this.media
        .find(m => m.type === type)
        .addOrigin(origin);
    } else if (arr.length === 0) {
      // No hay ninguno de ese tipo de media, se agrega uno nuevo
      this.media.push(new Media({ originArray: [origin], type }));
    } else {// Error, no deberia haber mas de un tipo
      console.log('More than one with the same type');
    }
  }
}
