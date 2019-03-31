import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as fromUI from '../store/ui'
import { map } from 'rxjs/operators';
import { UIService } from '../services/ui.service';
@Injectable()
export class UIEffects {
  // @Effect()
  // start$loading: Observable<Action> = this.actions$.pipe(
  //   ofType(fromUI.ActionTypes.START_LOADING)
  // );

  @Effect()
  snackbar = this.actions$.pipe(
    ofType(fromUI.ActionTypes.STOP_LOADING),
    map((action: fromUI.ShowSnackbar) => action.payload),
    map(({ message, duration, action }) => this.ui.showSnackbar(message, duration, action))
  );

  constructor(
    private actions$: Actions,
    private ui: UIService,
  ) { }
}
