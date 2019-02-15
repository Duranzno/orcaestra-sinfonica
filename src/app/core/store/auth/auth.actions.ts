import { Action } from '@ngrx/store';
import { IUser, User } from '../../models/user.model';
export class ActionTypes {
  static SET_AUTHENTICATED = '[Auth] Set Authenticated';
  static SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
  static SET_AVATAR = '[Auth] Set Avatar';
}
export class SetAuthenticated implements Action {
  readonly type = ActionTypes.SET_AUTHENTICATED;
  constructor(public payload: User) { }
}

export class SetUnauthenticated implements Action {
  readonly type = ActionTypes.SET_UNAUTHENTICATED;
  public payload = new User();
}
export class SetAvatar implements Action {
  readonly type = ActionTypes.SET_AVATAR;
  constructor(public payload: string) { }
}

export type Actions = SetAuthenticated
  | SetUnauthenticated
  | SetAvatar;
