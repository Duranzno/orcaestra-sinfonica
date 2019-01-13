import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MusicActions, SET_PARTITURA } from './music.actions';
import { IScore } from '../shared/models/partitura.interface';
import * as fromRoot from '../app.reducer';

export interface State {
    partitura: IScore;
}
const initialState: State = {
    partitura: {
        its: 0,
        obra: '',
        almacenamiento: []
    }
};

export function musicReducer(state = initialState, action: MusicActions) {
    switch (action.type) {
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
