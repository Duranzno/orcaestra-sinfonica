export enum InstrType {
  VIENTO = "viento",
  VOZ = "voz",
  PERCUSION = "percusion",
  CUERDAS = "cuerdas",
  TECLADO = "teclado",
}
export interface IInstr {
  nombre: string,
  tipo: InstrType;
}
