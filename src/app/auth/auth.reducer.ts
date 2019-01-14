import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_ADMIN, SET_NOADMIN } from './auth.actions';

export interface State {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const initialState: State = {
    isAuthenticated: false,
    isAdmin: false,
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_ADMIN:
            return {
                ...state,
                isAdmin: true,
            };
        case SET_NOADMIN:
            return {
                ...state,
                isAdmin: false,
            };
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                ...state,
                isAuthenticated: false
            };
        default: {
            return state;
        }
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getIsAdmin = (state: State) => state.isAdmin;
