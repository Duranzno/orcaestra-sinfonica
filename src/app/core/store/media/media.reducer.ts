import { ActionTypes, Actions } from './media.actions';
import { User, MediaType, UploadFile, Score, OriginType } from '../../models';
import { createUploadTask } from '@angular/fire/storage';

export interface State {
  files: UploadFile[];
  snapshot: {};
  cloud: OriginType;
}

const initialState: State = {
  files: [],
  snapshot: { downloadURL: '', state: 'ERROR' },
  cloud: OriginType.FIREBASE,
};

export function mediaReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.POST_MEDIA:
      return {
        ...state
      };
    case ActionTypes.CHANGE_CLOUD:
      return {
        ...state,
        cloud: action.payload as OriginType
      };
    case ActionTypes.POST_AVATAR:
      return {
        ...state,
      };
    case ActionTypes.MANAGE_MEDIA_ARRAY:
      return {
        ...state,
        files: [action.payload['file']] as UploadFile[]
      };
    case ActionTypes.SAVE_SCORE:
    case ActionTypes.SAVE_CATEGORY:
    case ActionTypes.FETCH_CATEGORY:
      return {...state };
    default: {
      return state;
    }
  }
}


// funciones que manejan el store
