import { ActionTypes, Actions } from './ui.actions';

export interface State {
  isLoading: boolean;
}
const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.START_LOADING:
      return {
        isLoading: true
      };
    case ActionTypes.STOP_LOADING:
      return {
        isLoading: false
      };
    default: {
      return state;
    }
  }
}

