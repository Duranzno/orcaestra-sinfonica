import { IScoreId } from './score.model';
import { IRegistro, RegistroTipo } from './registro.interface';
import { Media, IMedia, MediaTipo, Origen } from './media.model';
import { Persona, PersonaTipo } from './persona.interface';
import { InstrTipo, IInstr } from './instr.interface';
import { IUploadFile } from './upload.media.interface';

// Score class modified for better show
export interface IElementoIcono { icono: string; numero?: number; info?: string }
export class DataScore {

  obra: string;
  generos: string;
  extraInfo?: string;
  registro: string;
  media: IElementoIcono[] = [];
  gente: IElementoIcono[] = [];
  id: string;
  generosParser(g: string[]): string {
    return g.reduce((prev, curr) => `${prev} ${curr}`, '');
  }
  constructor(i: IScoreId) {
    this.id = i.id;
    this.obra = i.obra;
    this.extraInfo = i.extrainfo;
    this.generos = this.generosParser(i.generos);
    this.registro = i.almacenamiento;
    this.media = mediaParser(i.media);
    this.gente = genteParser(i.gente);
  }
}


export function imgParser(arr: Media[]): IElementoIcono[] {
  return arr
    .filter((({ tipo }) => ([MediaTipo.AVATAR, MediaTipo.IMG].includes(tipo))))
    .map((m) => (<IElementoIcono>{
      icono: m.tipo,
      numero: m.origenArray.length,
    }));

}
export function mediaParser(arr: IMedia[]): IElementoIcono[] {
  return (arr)
    .filter((({ tipo }) => (![MediaTipo.AVATAR, MediaTipo.IMG].includes(tipo))))
    .map((m) => (<IElementoIcono>{
      icono: m.tipo,
      numero: (m.origenArray) ? m.origenArray.length : 0,
    }));
}

export function uMediaParser(arr: IUploadFile[]): IElementoIcono[] {
  return (arr)
    .filter((({ tipo }) => (![MediaTipo.AVATAR, MediaTipo.IMG].includes(tipo))))
    .map((m) => (<IElementoIcono>{
      icono: m.tipo,
      numero: 0,
    }));
}
export function instrumentosParser(arr: string[]): IElementoIcono[] {
  // return arr.map(instr=>({
  //   icon:instr.tipo
  //   numero:
  // }))
  return [
    { icono: InstrTipo.VIENTO_MADERA, numero: 3 },
    { icono: InstrTipo.VIENTO_METAL, numero: 3 },
    { icono: InstrTipo.VOZ, numero: 3 },
    { icono: InstrTipo.TECLADO, numero: 3 },
    { icono: InstrTipo.PERCUSION, numero: 3 },
    { icono: InstrTipo.CUERDA, numero: 3 },
  ];
}
export function genteParser(arr: Persona[]): IElementoIcono[] {
  // return arr.map(instr=>({
  //   icon:instr.tipo
  //   numero:
  // }))
  return [
    { icono: PersonaTipo.ADAPTADOR, numero: 3 },
    { icono: PersonaTipo.ARREGLISTA, numero: 3 },
    { icono: PersonaTipo.AUTOR, numero: 3 },
    { icono: PersonaTipo.EDITOR, numero: 3 },
    { icono: PersonaTipo.ORQUESTADOR, numero: 3 },
    { icono: PersonaTipo.TRANSCRIPTOR, numero: 3 },
    { icono: PersonaTipo.UPLOADER, numero: 3 },
  ];
}