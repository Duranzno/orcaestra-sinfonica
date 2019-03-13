import { IScoreId } from "./score.model";
import { IStored, StoredType } from './almacenamiento.interface';
import { Media, MediaType } from './media.model';
import { Persona, PersonaTipo } from './persona.interface';
import { InstrType, IInstr } from './instr.interface';

//Score class modified for better show
export interface IconArray { icon: string, numero: number }
export class DataScore {

  its: number;
  obra: string;
  generos: string;
  extraInfo?: string;
  almacenamiento: IconArray[] = []
  media: IconArray[] = []
  instrumentos: IconArray[] = []
  gente: IconArray[] = [];
  id: string;
  generosParser(g: string[]): string {
    return g.reduce((prev, curr) => `${prev} ${curr}`, '')
  };

  constructor(i: IScoreId) {
    this.id = i.id;
    this.obra = i.obra;
    this.its = i.its;
    this.extraInfo = i.extrainfo;
    this.generos = this.generosParser(i.generos);
    this.almacenamiento = this.almacenamientoParser(i.almacenamiento);
    this.media = this.mediaParser(i.media);
    this.instrumentos = this.instrumentosParser(i.instrumentos);
    this.gente = this.genteParser(i.gente);
  }
  almacenamientoParser(arr: IStored[]): IconArray[] {
    // return arr.map((stored)=>({
    //   icon:stored.tipo,
    //   numero:stored.cantidad
    // }));
    return [
      { icon: StoredType.COPIA, numero: 3 },
      { icon: StoredType.PO, numero: 3 },
      { icon: StoredType.SCORE, numero: 3 },
    ]
  };
  mediaParser(arr: Media[]): IconArray[] {
    // return arr.map((m)=>({
    //   icon:m.type,
    //   numero:m.originArray.length
    // })
    return [
      { icon: MediaType.MIDI, numero: 3 },
      { icon: MediaType.MP3, numero: 3 },
      { icon: MediaType.MXML, numero: 3 },
      { icon: MediaType.YOUTUBE, numero: 3 },
      { icon: MediaType.PDF, numero: 3 },
    ]
  };
  instrumentosParser(arr: string[]): IconArray[] {
    // return arr.map(instr=>({
    //   icon:instr.tipo
    //   numero:
    // }))
    return [
      { icon: InstrType.VIENTO_MADERA, numero: 3 },
      { icon: InstrType.VIENTO_METAL, numero: 3 },
      { icon: InstrType.VOZ, numero: 3 },
      { icon: InstrType.TECLADO, numero: 3 },
      { icon: InstrType.PERCUSION, numero: 3 },
      { icon: InstrType.CUERDA, numero: 3 },
    ]
  };
  genteParser(arr: Persona[]): IconArray[] {
    // return arr.map(instr=>({
    //   icon:instr.tipo
    //   numero:
    // }))
    return [
      { icon: PersonaTipo.ADAPTADOR, numero: 3 },
      { icon: PersonaTipo.ARREGLISTA, numero: 3 },
      { icon: PersonaTipo.AUTOR, numero: 3 },
      { icon: PersonaTipo.EDITOR, numero: 3 },
      { icon: PersonaTipo.ORQUESTADOR, numero: 3 },
      { icon: PersonaTipo.TRANSCRIPTOR, numero: 3 },
      { icon: PersonaTipo.UPLOADER, numero: 3 },
    ]
  };




}