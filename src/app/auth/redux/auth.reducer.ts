import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';
import { User } from '../../shared/models/user.model';

export interface State {
    user: User;
}

const initialState: State = {
    user: {
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        group: '',
        isAdmin: false,
    }
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                user: action.payload,
            };
        case SET_UNAUTHENTICATED:
            return {
                ...state,
                user: initialState.user,
            };
        default: {
            return state;
        }
    }
}

export const getUser = (state: State) => state.user;
