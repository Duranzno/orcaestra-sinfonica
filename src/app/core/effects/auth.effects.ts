import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
// import { Store } from '@ngrx/store';
// import { OrcaState } from '../store';
import * as fromAuth from '../store/auth';
import * as fromUi from '../store/ui';

import { map, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { User } from '../models';
import { UserService } from '../services/firebase/user.service';
import { OrcaState } from '../store';
import { Store } from '@ngrx/store';
import { MessagingService } from '../services/messaging.service';
type stuff = [fromAuth.SetGrupo, OrcaState];
type latestFromID = [fromAuth.SetGrupo, OrcaState];

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<OrcaState>,
    private userService: UserService,
    private msg: MessagingService,
  ) { }

  @Effect()
  setAuth$ = this.actions$.pipe(
    ofType(fromAuth.ActionTypes.SET_AUTHENTICATED),
    map((action: any) => new fromAuth.SetAvatar(action.payload.avatar))
  );
  @Effect()
  uploadFCM$ = this.actions$.pipe(
    ofType(fromAuth.ActionTypes.UPLOAD_FCM),
    withLatestFrom(this.store$),
    map(([action, state]: latestFromID) => {
      return {
        fcm: action.payload,
        uid: state.user.user.uid,
      };
    }),
    map({ fcm, uid } => this.userService.saveFCMToken(uid, fcm))
  );
  // @Effect()
  // logAvatar$ = this.actions$.pipe(
  //   ofType(fromAuth.ActionTypes.SET_AVATAR)
  // );
  @Effect()
  setUnAuth$ = this.actions$.pipe(
    ofType(fromAuth.ActionTypes.SET_UNAUTHENTICATED),
    map(_ => new fromAuth.SetAvatar('/assets/user.jpg'))
  );
  @Effect()
  setGrupo$ = this.actions$.pipe(
    ofType(fromAuth.ActionTypes.SET_GRUPO),
    withLatestFrom(this.store$),
    map(([action, state]: stuff) => {
      this.store$.dispatch(new fromUi.StartLoading());
      return {
        grupo: action.payload,
        id: state.user.user.uid,
      };
    }),
    switchMap(({ grupo, id }) => this.userService.updateData(id, { grupo })),
    map(() => new fromUi.StopLoading())
  );

}
