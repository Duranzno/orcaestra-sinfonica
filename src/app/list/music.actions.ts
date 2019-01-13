import { Action } from '@ngrx/store';
import { IScore } from '../shared/models/partitura.interface';

export const SET_PARTITURA = '[Music] Partitura Seleccionada';

export class SetPartitura implements Action {
    readonly type = SET_PARTITURA;
    constructor(public payload: IScore) { }
}

export type MusicActions = SetPartitura;
