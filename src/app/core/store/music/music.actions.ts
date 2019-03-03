import { Action } from '@ngrx/store';
import { IScore, Origin, MediaType } from '../../models';
export class ActionTypes {
  static SET_PARTITURA = '[Music] Partitura Seleccionada';
  static SET_GRUPOS = '[Music] Grupos seleccionados';
  static ADD_ORIGIN = '[Music] Se agrego Origen';
}
export class SetPartitura implements Action {
  readonly type = ActionTypes.SET_PARTITURA;
  constructor(public payload: IScore) { }
}
export class SetGrupos implements Action {
  readonly type = ActionTypes.SET_GRUPOS;
  constructor(public payload: string[]) { }
}
export class AddOrigin implements Action {
  readonly type = ActionTypes.ADD_ORIGIN;
  constructor(public payload: { origin: Origin, type: MediaType }) { }
}

export type Actions = SetPartitura | SetGrupos | AddOrigin;
