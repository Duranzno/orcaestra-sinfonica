import { Persona, PersonaTipo } from './autor.interface';
import { IStored } from './almacenamiento.interface';
import { MediaType, Media, Origin, OriginType } from './media.interface';
import { UploadFile } from './upload.media.interface';

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
  constructor(score: IScore) {
    this.its = (score.its) ? score.its : -1;
    this.obra = (score.obra) ? score.obra : '';
    this.almacenamiento = (score.almacenamiento) ? score.almacenamiento : [];
    this.media = (score.media) ? score.media : [];
    this.generos = (score.generos) ? score.generos : [];
    this.instrumentos = (score.instrumentos) ? score.instrumentos : [];
    this.gente = (score.gente) ? score.gente : [];
    this.extrainfo = (score.extrainfo) ? score.extrainfo : '';
  }
  its: number = -1;
  obra: string = '';
  almacenamiento: IStored[] = [];
  media: Media[] = [];
  generos?: string[] = [];
  instrumentos?: string[] = [];
  gente?: Persona[] = [];
  extrainfo?: string = '';
  static isMedia(arg: any): arg is Score {
    return (arg.its !== undefined) && (arg.obra !== undefined) && (arg.almacenamiento !== undefined);
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

  setPath(type: MediaType): string {
    switch (type) {
      case MediaType.MP3:
      case MediaType.IMG:
      case MediaType.MIDI:
      case MediaType.MXML:
      case MediaType.PDF:
        // const autor = (data as Score).getAutor();
        // if (autor) {
        //   if (autor.apellido.length > 0) {
        //     return `OSJIG/musica/${autor.apellido}/${autor.nombre}/`;
        //   } else {
        //     return `OSJIG/musica/${autor.nombre}/`;
        //   }
        // } else {
        return `OSJIG/musica/${this.getAutor.name}/${this.obra}_${type}`;
      // }
      // break;
      case MediaType.YOUTUBE:
      default:
        const err = `Media ${type} no se suben archivos`;
        console.log(err);
        return err;
    }
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
