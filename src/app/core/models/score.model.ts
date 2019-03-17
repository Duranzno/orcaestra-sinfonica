import { Persona, PersonaTipo } from './persona.interface';
import { IStored } from './almacenamiento.interface';
import { MediaType, Media, Origin, OriginType } from './media.model';
import { UploadFile } from './upload.media.interface';
export enum CategoriaTipo {
  GENERO = "generos",
  GRUPOS = "grupos",
  INSTRUMENTOS = "instrumentos",
}
export interface Categoria { tipo: CategoriaTipo; categoria: string }
export interface IScoreId extends IScore { id: string; }

export interface IScore {
  // TODO OP/K/V/HOB  =>¿Que significan?

  // Obligatorios
  its: number;  // Numero  legado del sistema Anterior
  obra: string;  // Nombre de la Obra
  almacenamiento?: IStored[];  // Tipo Almacenamiento Fisico
  media?: Media[];
  /// OPTIONALES
  generos?: string[];
  instrumentos?: string[];  // Instrumentos Usados
  gente?: Persona[];
  extrainfo?: string;  // Información Extra
  suscriptores?: string[];

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

  getAutor(): Persona {
    const autor=this.gente.find(persona => persona.tipo === PersonaTipo.AUTOR);
    return (autor)?autor:{nombre:"Desconocido",tipo:PersonaTipo.AUTOR};
  }
  getNotAutor(): Persona[] {
    const notAutor=this.gente.filter(persona => persona.tipo !== PersonaTipo.AUTOR);
    return (notAutor)?notAutor:[];
  }
  getByMediaOrigin(mType: MediaType, oType: OriginType): Origin[] {
    return this
      .media.find(m => m.type === mType)
      .originArray.filter(o => o.type === oType);
  }

  getByMedia(mType: MediaType): Media[] {
    return this.media.filter(m => m.type === mType);
  }
  private authorPath(): string {
    const autor = this.getAutor();
    return ((autor.apellido)
      ? `${autor.apellido.toLowerCase().trim()}_${autor.nombre.toLowerCase().trim()}`
      : `${autor.nombre.toLowerCase().trim()}`
    );
  }
  setPath(type: MediaType, uFile: UploadFile): string {
    switch (type) {
      case MediaType.MP3:
      case MediaType.IMG:
      case MediaType.MIDI:
      case MediaType.MXML:
      case MediaType.PDF:
        const autor = this.getAutor();
        if (autor) {
          return `OSJIG/musica/${this.authorPath()}/${this.obra}/${uFile.file.name}`;
        } else {
          return `OSJIG/musica/${this.obra}/${uFile.file.name}`;
        }
      // break;
      case MediaType.YOUTUBE:
        return MediaType.YOUTUBE;
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
