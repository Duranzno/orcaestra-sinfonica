import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IScore } from '../shared/models/partitura.interface';
import { MusicActions, SET_PARTITURA } from './music.actions';
import * as fromRoot from '../app.reducer';

export interface MusicState {
    partitura: IScore;
}
export interface State extends fromRoot.State {
    lista: MusicState;
}

const initialState: MusicState = {
    partitura: {
        its: 0,
        obra: '',
        almacenamiento: []
    }
};

export function musicReducer(state = initialState, action: MusicActions) {
    switch (action.type) {
        case SET_PARTITURA:
            console.log(state);
            return Object.assign({}, state, {
                partitura: action.payload
            });
        default: {
            return state;
        }
    }
}
export const getMusicState = createFeatureSelector<MusicState>('lista');
// export const getPartitura = createSelector(getMusicState, (state: MusicState) => state.partitura);
