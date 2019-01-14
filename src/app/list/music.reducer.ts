import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MusicActions, SET_PARTITURA, SET_GRUPOS } from './music.actions';
import { IScore } from '../shared/models/partitura.interface';
import * as fromRoot from '../app.reducer';

export interface State {
    partitura: IScore;
    grupos: string[];
    lista: IScore[];
}
const initialState: State = {
    partitura: {
        its: 0,
        obra: '',
        almacenamiento: []
    },
    grupos: [],
    lista: [],
};

export function musicReducer(state = initialState, action: MusicActions) {
    switch (action.type) {
        case SET_GRUPOS: {
            return {
                ...state,
                grupos: action.payload,
            };
        }
        case SET_PARTITURA:
            // console.log(state);
            // return Object.assign({}, state, {
            //     partitura: action.payload
            // });
            return {
                ...state,
                partitura: action.payload,
            };
        default: {
            return state;
        }
    }
}
export const getPartitura = (state: State) => state.partitura;
export const getGrupos = (state: State) => state.grupos;

