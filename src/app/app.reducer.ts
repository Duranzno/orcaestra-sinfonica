import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromMusic from './list/music.reducer'
// import * as fromAuth from './auth/auth.reducer';

export interface State {
    //   ui: fromUi.State;
    // music: fromMusic.State
    //   auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    // music: fromMusic.musicReducer
    //   ui: fromUi.uiReducer,
    //   auth: fromAuth.authReducer
};

// export const getUiState = createFeatureSelector<fromUi.State>('ui');
// export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
// export const getMusicState = createFeatureSelector<fromMusic.State>('music');
// export const getPartitura = createSelector(getMusicState, fromMusic.getPartitura);
// export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
// export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

