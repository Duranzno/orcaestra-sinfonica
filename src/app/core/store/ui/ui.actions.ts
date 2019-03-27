import { Action } from '@ngrx/store';
export class ActionTypes {
  static START_LOADING = '[UI] Start Loading';
  static STOP_LOADING = '[UI] Stop Loading';
  static SHOW_SNACKBAR = '[UI] Showed snackbar';
}
export class StartLoading implements Action {
  readonly type = ActionTypes.START_LOADING;
}

export class StopLoading implements Action {
  readonly type = ActionTypes.STOP_LOADING;
}
export class ShowSnackbar implements Action {
  readonly type = ActionTypes.SHOW_SNACKBAR;
  constructor(public payload: { message: string, duration: number, action?: string }) { }
}

export type Actions = StartLoading | StopLoading | ShowSnackbar;
