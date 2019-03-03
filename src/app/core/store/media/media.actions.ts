import { Action } from '@ngrx/store';
import { User, MediaType, UploadFile, Score, OriginType } from '../../models';
export class ActionTypes {
  static POST_MEDIA = '[MEDIA] Uploaded Score Media to Respective Cloud';
  static SAVE_SCORE = '[MEDIA] Saved Score to Firestore';
  static MANAGE_MEDIA_ARRAY = '[MEDIA] Received Media Array';
  static POST_AVATAR = '[MEDIA] Uploaded Avatar to Respective Cloud';
  static CHANGE_CLOUD = '[MEDIA] Changed Cloud Provider';
}
export class PostMedia implements Action {
  readonly type = ActionTypes.POST_MEDIA;
  constructor(public payload: { file: UploadFile, score: Score }) { }
}
export class PostAvatar implements Action {
  readonly type = ActionTypes.POST_AVATAR;
  constructor(public payload: { file: UploadFile, user: User }) { }
}
export class SaveScore implements Action {
  readonly type = ActionTypes.SAVE_SCORE;
  constructor(public payload: Score) { }
}
export class ManageMediaArray implements Action {
  readonly type = ActionTypes.MANAGE_MEDIA_ARRAY;
  constructor(public payload: { files: UploadFile[] }) { }
}

export class ChangeCloud implements Action {
  readonly type = ActionTypes.CHANGE_CLOUD;
  constructor(public payload: OriginType) { }
}

export type Actions = PostMedia | PostAvatar | SaveScore | ManageMediaArray | ChangeCloud;
