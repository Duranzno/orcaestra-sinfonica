export enum RegistroTipo {
  SCORE = 'Score',
  ORIGINAL = 'Original',
}
export interface IRegistro {
  cantidad: number;
  tipo: RegistroTipo;
}
