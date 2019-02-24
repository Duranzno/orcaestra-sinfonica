import { ActionTypes, Actions } from './auth.actions';
import { User } from '../../models';

export interface State {
  user: User;
  avatarSrc: string;
}

const initialState: State = {
  user: new User(),
  avatarSrc: '/assets/user.jpg',
};

export function authReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        user: action.payload as User,
      };
    case ActionTypes.SET_UNAUTHENTICATED:
      return {
        ...state,
        user: initialState.user,
      };
    case ActionTypes.SET_AVATAR:
      return {
        ...state,
        avatarSrc: action.payload as string,
      };
    default: {
      return state;
    }
  }
}


// funciones que manejan el store
