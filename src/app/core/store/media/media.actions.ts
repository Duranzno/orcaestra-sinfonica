import { Action } from '@ngrx/store';
import { User, MediaTipo, IUploadFile, Score, OrigenTipo, IScore, CategoriaTipo, Categoria } from '../../models';
export class ActionTypes {
  static MANAGE_MEDIA_ARRAY = '[MEDIA] Received Media Array';
  static POST_MEDIA = '[MEDIA] Uploaded Score Media to Respective Cloud';
  static POST_AVATAR = '[MEDIA] Uploaded Avatar to Respective Cloud';
  static POST_CATEGORY = '[MEDIA] Saved Category (genre/instrument) to Firestore';
  static SAVE_SCORE = '[MEDIA] Saved Score to Firestore';
  static FETCH_CATEGORY = '[MEDIA]Fetch Category from Firestore';
  static FETCH_SCORE = '[MEDIA]Fetch Score from Firestore';
  static CHANGE_CLOUD = '[MEDIA] Changed Cloud Provider';
}
export class PostMedia implements Action {
  readonly type = ActionTypes.POST_MEDIA;
  constructor(public payload: { file: IUploadFile, score: IScore }) { }
}
export class PostAvatar implements Action {
  readonly type = ActionTypes.POST_AVATAR;
  constructor(public payload: { file: IUploadFile, user: User }) { }
}
export class SaveScore implements Action {
  readonly type = ActionTypes.SAVE_SCORE;
  constructor(public payload: Score) { }
}
export class PostCateg implements Action {
  readonly type = ActionTypes.POST_CATEGORY;
  constructor(public payload: Categoria) { }
}

export class ManageMediaArray implements Action {
  readonly type = ActionTypes.MANAGE_MEDIA_ARRAY;
  constructor(public payload: { files: IUploadFile[] }) { }
}

export class FetchCategory implements Action {
  readonly type = ActionTypes.FETCH_CATEGORY;
  constructor(public payload?: any) { }
}
export class FetchScore implements Action {
  readonly type = ActionTypes.FETCH_SCORE;
  constructor(public payload: string) { }
}

export class ChangeCloud implements Action {
  readonly type = ActionTypes.CHANGE_CLOUD;
  constructor(public payload: OrigenTipo) { }
}

export type Actions = PostMedia | FetchScore | FetchCategory | PostAvatar | PostCateg | SaveScore | ManageMediaArray | ChangeCloud;
