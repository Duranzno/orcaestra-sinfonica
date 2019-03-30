import { Action } from '@ngrx/store';
import { IUser, User } from '../../models/user.model';
export class ActionTypes {
  static SET_AUTHENTICATED = '[Auth] Usuario autenticado';
  static SET_UNAUTHENTICATED = '[Auth] Usuario no autenticado';
  static SET_ID = '[Auth] UID de Firestore seleccionado ';
  static SET_AVATAR = '[Auth] Avatar del usuario seleccionado';
  static SET_ORGANIZATION = '[Auth] Organización seleccionada';
  static SET_GRUPO = '[Auth] Grupo actualizado';
  static UPLOAD_FCM = '[Auth] Se va a guardar';
}
export class SetAuthenticated implements Action {
  readonly type = ActionTypes.SET_AUTHENTICATED;
  constructor(public payload: User) { }
}
export class SetId implements Action {
  readonly type = ActionTypes.SET_ID;
  constructor(public payload: string) { }
}
export class SetGrupo implements Action {
  readonly type = ActionTypes.SET_GRUPO;
  constructor(public payload: string) { }
}
export class SetOrganization implements Action {
  readonly type = ActionTypes.SET_ORGANIZATION;
  constructor(public payload: string) { }
}

export class SetUnauthenticated implements Action {
  readonly type = ActionTypes.SET_UNAUTHENTICATED;
  public payload = new User({ 'email': '', 'password': '' });

}
export class SetAvatar implements Action {
  readonly type = ActionTypes.SET_AVATAR;
  constructor(public payload: string) { }
}

export type Actions = SetAuthenticated
  | SetUnauthenticated
  | SetAvatar
  | SetId
  | SetOrganization
  | SetGrupo;
