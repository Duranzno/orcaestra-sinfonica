import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromUI from '@core/store/ui';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class UIEffects {
  @Effect()
  startLoadingTest$: Observable<Action> = this.actions$.pipe(
    ofType(fromUI.ActionTypes.START_LOADING),

  );

  constructor(
    private actions$: Actions
  ) { }
}
