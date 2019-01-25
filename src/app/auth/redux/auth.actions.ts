import { Action } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_ADMIN = '[Auth] Set user as Admin';
export const SET_NOADMIN = '[Auth] Set user as regular user';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
  constructor(public payload: User) { }
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated |
  SetUnauthenticated;
