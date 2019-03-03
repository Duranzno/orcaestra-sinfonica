import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, filter, mergeMap, catchError, withLatestFrom, tap, finalize } from 'rxjs/operators';


import { UploadFile, Score, User, MediaType } from '../models';
import { FirebaseService } from '../services/upload/firebase.service';
import { OrcaState } from '../store';
import * as fromMedia from '../store/media';
import * as fromMusic from '../store/music';
import * as fromAuth from '../store/auth';
import * as fromUi from '../store/ui';
import { last } from '@angular/router/src/utils/collection';
type stuff = [fromMedia.ManageMediaArray, OrcaState];
@Injectable()
export class MediaEffects {


  @Effect()
  saveScore$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.SAVE_SCORE),
      map((action: fromMedia.SaveScore) => action.payload),
      map(score => {
        console.log('gonna save score');
        this.fb.saveScore(score);
        this.store$.dispatch(new fromUi.StopLoading());
        return new fromMusic.SetPartitura(score);
      })
    );
  @Effect()
  postAvatar$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.POST_AVATAR),
      map((action: fromMedia.PostAvatar) => action.payload),
      mergeMap(payload => {
        return this.fb.upload(
          payload.file,
          payload.user.setPath(payload.file.type)
        )
          .pipe(
            map(origin => {
              console.log(origin);
              return new fromAuth.SetAvatar(origin.url);
            })
          );
      })
    );

  @Effect()
  manageMediaArray: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.MANAGE_MEDIA_ARRAY),
      withLatestFrom(this.store$),
      map(([action, state]: stuff) => {
        this.store$.dispatch(new fromUi.StartLoading());
        return {
          files: action.payload.files,
          iscore: state.music.partitura,
        };
      }),
      mergeMap(({ files, iscore }) => {
        const score = new Score(iscore);
        return from(files).pipe(
          mergeMap((u, index) => {
            console.log(JSON.stringify(u), index);
            return this.fb.upload(u, score.setPath(u.type, u))
              .pipe(map(o => ({ origin: o, type: u.type })));
          }),
          tap(({ origin, type }) => {
            console.log('tap');
            score.addMediaOrigin(type, origin);
          }),
          finalize(() => {
            console.log('finalize');
            return this.store$.dispatch(new fromMedia.SaveScore(score));
          })
        );
      }),
    );

  @Effect()
  postMedia$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.POST_MEDIA),
      map((action: fromMedia.PostMedia) => action.payload),
      mergeMap(payload => {
        const type: MediaType = payload.file.type;
        const score = new Score(payload.score);
        return this.fb.upload(
          payload.file,
          score.setPath(type, payload.file)
        )
          .pipe(
            map(origin => {
              return new fromMusic.AddOrigin({ origin: origin, type: payload.file.type });
            })
          );
      })
    );

  constructor(
    private actions$: Actions,
    private store$: Store<OrcaState>,
    private fb: FirebaseService,
  ) { }
}
