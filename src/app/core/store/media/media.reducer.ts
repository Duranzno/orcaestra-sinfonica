import { ActionTypes, Actions } from './media.actions';
import { User, MediaType, UploadFile } from '@core/models';

export interface State {
  files: UploadFile[];
}

const initialState: State = {
  files: [],
};

export function mediaReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.POST_MEDIA_FIREBASE:
      return {
        ...state,
        files: action.payload as UploadFile[]
      };
    case ActionTypes.SET_MEDIA_AVATAR:
    default: {
      return state;
    }
  }
}


// funciones que manejan el store
