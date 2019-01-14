import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_ADMIN = '[Auth] Set user as Admin';
export const SET_NOADMIN = '[Auth] Set user as regular user';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}
export class SetAdmin implements Action {
  readonly type = SET_ADMIN;
}
export class SetNoAdmin implements Action {
  readonly type = SET_NOADMIN;
}


export type AuthActions = SetAuthenticated |
  SetUnauthenticated |
  SetAdmin |
  SetNoAdmin;
