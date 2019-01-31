import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { OrcaState } from '../store';
import * as fromAuth from '@core/store/auth';
import { map } from 'rxjs/operators';
type Action = fromAuth.Actions;

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<OrcaState>,

  ) { }

  @Effect() name$ = this.actions$.pipe(
    ofType(fromAuth.ActionTypes.SET_AUTHENTICATED))
    .subscribe(x => console.log(x));

}
