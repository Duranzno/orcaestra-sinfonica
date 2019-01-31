import { Action } from '@ngrx/store';
import { IUser, User } from '@core/models/user.model';
export class ActionTypes {
  static SET_AUTHENTICATED = '[Auth] Set Authenticated';
  static SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
  static SET_ADMIN = '[Auth] Set user as Admin';
  static SET_NOADMIN = '[Auth] Set user as regular user';
}
export class SetAuthenticated implements Action {
  readonly type = ActionTypes.SET_AUTHENTICATED;
  constructor(public payload: User) { }
}

export class SetUnauthenticated implements Action {
  readonly type = ActionTypes.SET_UNAUTHENTICATED;
  public payload = new User();
}

export type Actions = SetAuthenticated |
  SetUnauthenticated;
