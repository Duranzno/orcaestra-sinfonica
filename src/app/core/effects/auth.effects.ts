import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { OrcaState } from '../store';
import * as fromAuth from '@core/store/auth';
import * as fromMusic from '@core/store/music';

import { map, tap, switchMap, catchError } from 'rxjs/operators';
type Action = fromAuth.Actions;

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<OrcaState>,
  ) { }

  @Effect()
  setAuth$ = this.actions$.pipe(
    ofType(fromAuth.ActionTypes.SET_AUTHENTICATED),
    map((error) => new fromAuth.SetAvatar('/assets/user.jpg')),
    tap(x => { console.log(x); })
    // switchMap((payload) => {
    //   return of('error')
    //     .pipe(
    //       map((error) => of(new fromAuth.SetAvatar('/assets/user.jpg')))
    //     )
    // })
  );

  // @Effect()
  // setUnAuth$ = this.actions$.pipe(
  //   ofType(fromAuth.ActionTypes.SET_UNAUTHENTICATED),
  //   // tap(x => console.log(x))
  // );

}
