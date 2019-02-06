import { Action } from '@ngrx/store';
import { IScore } from '@core/models/partitura.interface';
export class ActionTypes {
  static SET_PARTITURA = '[Music] Partitura Seleccionada';
  static SET_GRUPOS = '[Music] Grupos seleccionados';
  static ADD_FAV = '[Music] Favorito Agregado';
}
export class SetPartitura implements Action {
  readonly type = ActionTypes.SET_PARTITURA;
  constructor(public payload: IScore) { }
}
export class SetGrupos implements Action {
  readonly type = ActionTypes.SET_GRUPOS;
  constructor(public payload: string[]) { }
}

export type Actions = SetPartitura | SetGrupos;
