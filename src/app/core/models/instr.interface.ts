export enum InstrType {
  VIENTO_METAL = "metal",
  VIENTO_MADERA = "madera",
  VOZ = "voz",
  PERCUSION = "percusion",
  CUERDA = "cuerdas",
  TECLADO = "teclado",
}
export interface IInstr {
  nombre: string,
  tipo: InstrType;
}
