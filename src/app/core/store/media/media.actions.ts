import { Action } from '@ngrx/store';
import { User, MediaType, UploadFile, Score } from '../../models';
export class ActionTypes {
  static POST_SCORE_MEDIA_FB = '[MEDIA] Uploaded Score Media to Firebase';
  static POST_AVATAR_FB = '[MEDIA] Uploaded Avatar to Firebase';
  static UPDATE_MEDIA_SNAPSHOT = '[MEDIA] Something new is';
}
export class PostScoreMediaF implements Action {
  readonly type = ActionTypes.POST_SCORE_MEDIA_FB;
  constructor(public payload: { files: UploadFile[], score: Score }) { }
}

export class PostAvatarF implements Action {
  readonly type = ActionTypes.POST_AVATAR_FB;
  constructor(public payload: { file: UploadFile, user: User }) { }
}
export class UpdateMediaSnapshot implements Action {
  readonly type = ActionTypes.UPDATE_MEDIA_SNAPSHOT;
  constructor(public payload: any) { }
}
export type Actions = PostScoreMediaF | PostAvatarF | UpdateMediaSnapshot;
