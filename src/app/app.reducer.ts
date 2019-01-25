import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/redux/ui.reducer';
import * as fromMusic from './list/redux/music.reducer';
import * as fromAuth from './auth/redux/auth.reducer';

export interface State {
    ui: fromUi.State;
    user: fromAuth.State;
    music: fromMusic.State;
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer,
    user: fromAuth.authReducer,
    music: fromMusic.musicReducer,
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('user');
export const getUser = createSelector(getAuthState, fromAuth.getUser);

export const getMusicState = createFeatureSelector<fromMusic.State>('music');
export const getPartitura = createSelector(getMusicState, fromMusic.getPartitura);
export const getGrupos = createSelector(getMusicState, fromMusic.getGrupos);

