import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { OrcaState } from '../store';
import * as fromMusic from '../store/music';

import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../models';

@Injectable()
export class MusicEffects {
  constructor(
    private actions$: Actions,
    private store: Store<OrcaState>,
  ) { }

  // @Effect()
  // setAuth$ = this.actions$.pipe(
  //   ofType(fromAuth.ActionTypes.SET_AUTHENTICATED),
  //   map((action: any) => new fromAuth.SetAvatar(action.payload.avatar))
  // );
  // @Effect()
  // logAvatar$ = this.actions$.pipe(
  //   ofType(fromAuth.ActionTypes.SET_AVATAR)
  // );
  // @Effect()
  // setUnAuth$ = this.actions$.pipe(
  //   ofType(fromAuth.ActionTypes.SET_UNAUTHENTICATED),
  //   map(_ => new fromAuth.SetAvatar('/assets/user.jpg'))
  // );

}
