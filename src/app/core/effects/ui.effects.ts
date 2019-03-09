import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

@Injectable()
export class UIEffects {
  // @Effect()
  // start$loading: Observable<Action> = this.actions$.pipe(
  //   ofType(fromUI.ActionTypes.START_LOADING)
  // );

  // @Effect()
  // stop$loading: Observable<Action> = this.actions$.pipe(
  //   ofType(fromUI.ActionTypes.STOP_LOADING)
  // );

  constructor(
    private actions$: Actions
  ) { }
}
