import { ActionTypes, Actions } from './media.actions';
import { User, MediaTipo, IUploadFile, Score, OrigenTipo } from '../../models';
import { createUploadTask } from '@angular/fire/storage';

export interface State {
  files: IUploadFile[];
  cloud: OrigenTipo;
}

const initialState: State = {
  files: [],
  cloud: OrigenTipo.FIREBASE,
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
        cloud: action.payload as OrigenTipo
      };
    case ActionTypes.POST_AVATAR:
      return {
        ...state,
      };
    case ActionTypes.MANAGE_MEDIA_ARRAY:
      return {
        ...state,
        files: [action.payload['file']] as IUploadFile[]
      };
    case ActionTypes.SAVE_SCORE:
    case ActionTypes.SAVE_FAV:
    case ActionTypes.POST_CATEGORY:
    case ActionTypes.FETCH_CATEGORY:
    case ActionTypes.FETCH_SCORE:
      return { ...state };
    default: {
      return state;
    }
  }
}


// funciones que manejan el store
