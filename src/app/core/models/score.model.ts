import { Persona, PersonaTipo } from './persona.interface';
import { IRegistro } from './registro.interface';
import { MediaTipo, Media, Origen, OrigenTipo } from './media.model';
import { IUploadFile } from './upload.media.interface';

export enum CategoriaTipo {
  GENERO = "generos",
  GRUPOS = "grupos",
  INSTRUMENTOS = "instrumentos",
}
export interface Categoria { tipo: CategoriaTipo; categoria: string }
export interface IScoreId extends IScore { id: string; }

export interface IScore {
  // Obligatorios
  obra: string;  // Nombre de la Obra
  almacenamiento?: string;  // Tipo Almacenamiento Fisico
  media?: Media[];
  generos?: string[];
  instrumentos?: string[];  // Instrumentos Usados
  gente?: Persona[];
  extrainfo?: string;  // Información Extra
  suscriptores?: string[];
}
export class Score implements IScore {
  obra: string = '';
  almacenamiento: string;
  media: Media[] = [];
  generos?: string[] = [];
  instrumentos?: string[] = [];
  gente?: Persona[] = [];
  extrainfo?: string = '';
  constructor(score: IScore) {
    this.obra = (score.obra) ? score.obra : '';
    this.almacenamiento = (score.almacenamiento) ? score.almacenamiento : '';
    this.media = (score.media) ? score.media : [];
    this.generos = (score.generos) ? score.generos : [];
    this.instrumentos = (score.instrumentos) ? score.instrumentos : [];
    this.gente = (score.gente) ? score.gente : [];
    this.extrainfo = (score.extrainfo) ? score.extrainfo : '';
  }

  static isMedia(arg: any): arg is Score {
    return (arg.its !== undefined) && (arg.obra !== undefined) && (arg.almacenamiento !== undefined);
  }

  getAutor(): Persona {
    const autor = this.gente.find(persona => persona.tipo === PersonaTipo.AUTOR);
    return (autor) ? autor : { nombre: "Desconocido", tipo: PersonaTipo.AUTOR };
  }
  getNotAutor(): Persona[] {
    const notAutor = this.gente.filter(persona => persona.tipo !== PersonaTipo.AUTOR);
    return (notAutor) ? notAutor : [];
  }
  getByMediaOrigen(mType: MediaTipo, oType: OrigenTipo): Origen[] {
    return this
      .media.find(m => m.tipo === mType)
      .origenArray.filter(o => o.tipo === oType);
  }

  getByMedia(mType: MediaTipo): Media[] {
    return this.media.filter(m => m.tipo === mType);
  }
  private authorPath(): string {
    const autor = this.getAutor();
    return ((autor.apellido)
      ? `${autor.apellido.toLowerCase().trim()}_${autor.nombre.toLowerCase().trim()}`
      : `${autor.nombre.toLowerCase().trim()}`
    );
  }
  setPath(type: MediaTipo, uFile: IUploadFile): string {
    switch (type) {
      case MediaTipo.MP3:
      case MediaTipo.IMG:
      case MediaTipo.MIDI:
      case MediaTipo.PDF:
        const autor = this.getAutor();
        if (autor) {
          return `OSJIG/musica/${this.authorPath()}/${this.obra}/${uFile.archivo.name}`;
        } else {
          return `OSJIG/musica/${this.obra}/${uFile.archivo.name}`;
        }
      // break;
      case MediaTipo.YOUTUBE:
        return MediaTipo.YOUTUBE;
      default:
        const err = `Media ${type} no se suben archivos`;
        console.log(err);
        return err;
    }
  }
  addMediaOrigen(type: MediaTipo, origin: Origen) {
    const arr = this.media.filter(m => m.tipo === type);
    if (arr.length === 1) {
      // Ya existe ese tipo en la base de datos
      this.media
        .find(m => m.tipo === type)
        .addOrigen(origin);
    } else if (arr.length === 0) {
      // No hay ninguno de ese tipo de media, se agrega uno nuevo
      this.media.push(new Media({ origenArray: [origin], tipo: type }));
    } else {// Error, no deberia haber mas de un tipo
      console.log('More than one with the same type');
    }
  }
}
