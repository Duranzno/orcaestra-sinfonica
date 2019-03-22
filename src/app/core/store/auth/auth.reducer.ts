import { ActionTypes, Actions } from './auth.actions';
import { User, IUser } from '../../models';

export interface State {
  user: IUser;
  id: string
  avatarSrc: string;
}

const initialState: State = {
  id: '',
  user: new User({ 'email': '', 'password': '' }),
  avatarSrc: '/assets/user.jpg',
};

export function authReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        user: { ...action.payload as IUser, password: 'secret' },
      };
    case ActionTypes.SET_ID:
      return {
        ...state,
        id: action.payload as string,
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
