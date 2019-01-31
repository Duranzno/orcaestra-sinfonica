import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionTypes, Actions } from './music.actions';
import { IScore } from '@core/models/partitura.interface';

export interface State {
  partitura: IScore;
  grupos: string[];
  favoritos: IScore[];
}
const initialState: State = {
  partitura: {
    its: 0,
    obra: '',
    almacenamiento: [],
  },
  grupos: [],
  favoritos: [],
};

export function musicReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_GRUPOS: {
      return {
        ...state,
        grupos: action.payload as string[],
      };
    }
    case ActionTypes.SET_PARTITURA:
      return {
        ...state,
        partitura: action.payload as IScore,
      };
    default: {
      return state;
    }
  }
}

