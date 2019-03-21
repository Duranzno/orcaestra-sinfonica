import { State } from './music.reducer';
import { OrcaState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const getMusic = (state: OrcaState) => state.music;

export const getPartitura = createSelector(getMusic, (state: State) => state.partitura);
export const getGrupos = createSelector(getMusic, (state: State) => state.grupos);
export const getGeneros = createSelector(getMusic, (state: State) => state.generos);
export const getInstrumentos = createSelector(getMusic, (state: State) => state.instrumentos);
export const getFavPartituras = createSelector(getMusic, (state: State) => state.favs);
