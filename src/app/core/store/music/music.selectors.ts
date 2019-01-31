import { State } from './music.reducer';
import { OrcaState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const getMusic = (state: OrcaState) => state.music;

export const getPartitura = createSelector(getMusic, (state: State) => state.partitura);
export const getGrupos = createSelector(getMusic, (state: State) => state.grupos);
export const getFavoritos = createSelector(getMusic, (state: State) => state.favoritos);

