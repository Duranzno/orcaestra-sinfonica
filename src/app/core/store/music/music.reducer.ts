import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionTypes, Actions } from './music.actions';
import { IScore, Origin, MediaType, Score, CategoriaTipo, IScoreId } from '../../models/';

export interface State {
  partitura: IScore;
  favs: IScoreId[];
  instrumentos: string[];
  generos: string[];
  grupos: string[];
}
const initialState: State = {
  partitura: {
    its: 0,
    obra: '',
    almacenamiento: [],
  },
  favs: [],
  generos: [],
  instrumentos: [],
  grupos: [],
};

export function musicReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_CATEGORIES: {
      return setCategories(state, action.payload as { generos: string[], grupos: string[], instrumentos: string[] });
    }
    case ActionTypes.ADD_ORIGIN: {
      return addOrigin(state, action.payload as { origin: Origin, type: MediaType });
    }
    case ActionTypes.SET_FAVS:
      return {
        ...state,
        favs: action.payload as IScoreId[],
      }
    case ActionTypes.SET_PARTITURA:
      return {
        ...state,
        partitura: action.payload as IScore,
      };
    case ActionTypes.ADD_CATEGORY:
      return addCateg(state, action.payload as { tipo: CategoriaTipo, categoria: string });
    default: {
      return state;
    }
  }
}
function addOrigin(state: State, payload: { origin: Origin, type: MediaType }): State {
  const partitura = new Score(state.partitura);
  partitura.addMediaOrigin(payload.type, payload.origin);
  return { ...state, partitura };
}
function setCategories(state, payload: { generos: string[], grupos: string[], instrumentos: string[] }) {
  return (payload)?{
    ...state,
    generos: payload.generos,
    instrumentos: payload.instrumentos,
    grupos: payload.grupos,
  }:state;
}
function addCateg(state: State, payload: { tipo: CategoriaTipo, categoria: string }) {
  switch (payload.tipo) {
    case CategoriaTipo.GENERO:
      return { ...state, genero: [...state.generos, payload.categoria] }
    case CategoriaTipo.GRUPOS:
      return { ...state, grupos: [...state.grupos, payload.categoria] }
    case CategoriaTipo.INSTRUMENTOS:
      return { ...state, instrumentos: [...state.instrumentos, payload.categoria] }
    default:
      return state;
  }
}


