import { Action } from '@ngrx/store';
import { IScore } from '../../shared/models/partitura.interface';

export const SET_PARTITURA = '[Music] Partitura Seleccionada';
export const SET_GRUPOS = '[Music] Grupos seleccionados';

export class SetPartitura implements Action {
    readonly type = SET_PARTITURA;
    constructor(public payload: IScore) { }
}
export class SetGrupos implements Action {
    readonly type = SET_GRUPOS;
    constructor(public payload: string[]) { }
}

export type MusicActions = SetPartitura | SetGrupos;
