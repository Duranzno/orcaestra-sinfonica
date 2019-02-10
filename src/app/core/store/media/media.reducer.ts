import { ActionTypes, Actions } from './media.actions';
import { User, MediaType, UploadFile } from '@core/models';
import { createUploadTask } from '@angular/fire/storage';

export interface State {
  files: UploadFile[];
  snapshot: any;
}

const initialState: State = {
  files: [],
  snapshot: {},
};

export function mediaReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.POST_SCORE_MEDIA_FB:
      return {
        ...state,
        files: action.payload['files'] as UploadFile[]
      };
    case ActionTypes.POST_AVATAR_FB:
      return {
        ...state,
        files: [action.payload['file']] as UploadFile[]
      };
    case ActionTypes.UPDATE_MEDIA_SNAPSHOT:
      return {
        ...state,
        snapshot: action.payload,
      };
    default: {
      return state;
    }
  }
}


// funciones que manejan el store
