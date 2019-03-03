import { State } from './media.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrcaState } from '../reducers';

export const getMediaState = createFeatureSelector<State>('media');
export const getFiles = createSelector(getMediaState, (state: State) => state.files);
export const getSnapshot = createSelector(getMediaState, (state: State) => state.snapshot);
export const getCloud = createSelector(getMediaState, (state: State) => state.cloud);

