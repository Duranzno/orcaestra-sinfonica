import { Action } from '@ngrx/store';
export class ActionTypes {
  static START_LOADING = '[UI] Start Loading';
  static STOP_LOADING = '[UI] Stop Loading';
}
export class StartLoading implements Action {
  readonly type = ActionTypes.START_LOADING;
}

export class StopLoading implements Action {
  readonly type = ActionTypes.STOP_LOADING;
}

export type Actions = StartLoading | StopLoading;
