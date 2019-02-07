import { Action } from '@ngrx/store';
import { User, MediaType, UploadFile } from '../../models';
export class ActionTypes {
  static POST_MEDIA_FIREBASE = '[MEDIA] Uploaded Media';
  static SET_MEDIA_AVATAR = '[MEDIA] Uploaded Media is Avatar ';
}
export class PostMediaF implements Action {
  readonly type = ActionTypes.POST_MEDIA_FIREBASE;
  constructor(public payload: UploadFile[]) { }
}

export class SetMediaAvatar implements Action {
  readonly type = ActionTypes.SET_MEDIA_AVATAR;
  constructor(public payload: { url: string, user: User }) { }
}
export type Actions = PostMediaF | SetMediaAvatar;
