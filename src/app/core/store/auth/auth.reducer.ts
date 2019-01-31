import { ActionTypes, Actions } from './auth.actions';
import { User } from '@core/models';

export interface State {
  user: User;
}

const initialState: State = {
  user: new User()
};

export function authReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.SET_UNAUTHENTICATED:
      return {
        ...state,
        user: initialState.user,
      };
    default: {
      return state;
    }
  }
}


// funciones que manejan el store
