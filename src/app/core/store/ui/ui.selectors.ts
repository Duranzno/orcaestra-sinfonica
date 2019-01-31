import { createSelector } from '@ngrx/store';
import { OrcaState } from '../reducers';
import { State } from './ui.reducer';

const getUi = (state: OrcaState) => state.ui;
export const getIsLoading = createSelector(getUi, (state: State) => state.isLoading);
