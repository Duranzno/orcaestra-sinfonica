import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { finalize, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { MediaType, Score } from '../models';
import { FirebaseService } from '../services/upload/firebase.service';
import { OrcaState } from '../store';
import * as fromAuth from '../store/auth';
import * as fromMedia from '../store/media';
import * as fromMusic from '../store/music';
import * as fromUi from '../store/ui';


type stuff = [fromMedia.ManageMediaArray, OrcaState];
@Injectable()
export class MediaEffects {

  @Effect()
  fetchCategory$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.FETCH_CATEGORY),
      map((action: fromMedia.FetchCategory) => action.payload),
      switchMap((type: string) => {
        return this.fb.fetchCateg()
          .pipe(
            // tap(result => { console.log(result); }),
            map(result => {
              return new fromMusic.SetCategories(result);
            })
          );
      })
    );

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
