import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { OrcaState } from '../store';
import * as fromAuth from '@core/store/auth';
import { map, tap } from 'rxjs/operators';
type Action = fromAuth.Actions;

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<OrcaState>,

  ) { }

  // @Effect()
  // setAuth$ = this.actions$.pipe(
  //   ofType(fromAuth.ActionTypes.SET_AUTHENTICATED),
  //   // tap(x => console.log(x))
  // );

  // @Effect()
  // setUnAuth$ = this.actions$.pipe(
  //   ofType(fromAuth.ActionTypes.SET_UNAUTHENTICATED),
  //   // tap(x => console.log(x))
  // );

}
