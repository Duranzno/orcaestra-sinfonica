import { ActionTypes, Actions } from './auth.actions';
import { User, IUser } from '../../models';

export interface State {
  user: IUser;
  avatarSrc: string;
  organization: string;
}

const initialState: State = {
  organization: 'OSJIG',
  user: new User({ 'email': '', 'password': '', 'grupo': '' }),
  avatarSrc: '/assets/user.jpg',
};

export function authReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        user: { ...action.payload as IUser, password: 'secret', uid: state.user.uid },
      };
    case ActionTypes.SET_ID:
      return {
        ...state,
        // uid: action.payload as string,
        user: { ...state.user, uid: action.payload as string },
      };
    case ActionTypes.SET_GRUPO:
      return {
        ...state,
        user: { ...state.user, grupo: action.payload as string },
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
    case ActionTypes.SET_ORGANIZATION:
      return {
        ...state,
        organization: action.payload as string,
      };
    case ActionTypes.UPLOAD_FCM:
      return state;
    default: {
      return state;
    }
  }
}


// funciones que manejan el store
