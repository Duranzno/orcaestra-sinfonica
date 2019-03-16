import { Action } from '@ngrx/store';
import { IScore, Origin, MediaType, CategoriaTipo } from '../../models';
export class ActionTypes {
  static SET_PARTITURA = '[MUSIC] Partitura Seleccionada';
  static ADD_ORIGIN = '[MUSIC] Se agrego Origen';
  static SET_CATEGORIES = '[MUSIC] Saved category (Generos/Instruemntos)';
  static ADD_CATEGORY = '[MUSIC] Se guardo categoria a las existentes';
  // static SET_GRUPO = '[MUSIC] Saved Grupo';
}
export class SetPartitura implements Action {
  readonly type = ActionTypes.SET_PARTITURA;
  constructor(public payload: IScore) { }
}
export class SetCategories implements Action {
  readonly type = ActionTypes.SET_CATEGORIES;
  constructor(public payload: { generos: string[], grupos: string[], instrumentos: string[] }) { }
}
export class AddOrigin implements Action {
  readonly type = ActionTypes.ADD_ORIGIN;
  constructor(public payload: { origin: Origin, type: MediaType }) { }
}
export class AddCategory implements Action {
  readonly type = ActionTypes.ADD_ORIGIN;
  constructor(public payload: { tipo: CategoriaTipo, categoria: string }) { }
}

export type Actions = SetPartitura | SetCategories | AddOrigin | AddCategory;
