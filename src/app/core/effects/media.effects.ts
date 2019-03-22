import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { finalize, map, mergeMap, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { MediaTipo, Score } from '../models';
import { OrcaState } from '../store';
import * as fromAuth from '../store/auth';
import * as fromMedia from '../store/media';
import * as fromMusic from '../store/music';
import * as fromUi from '../store/ui';
import { FirestorageService } from '../services/upload/firestorage.service';
import { ScoreService } from '../services/firebase/score.service';
import { CategoriesService } from '../services/firebase/categories.service';


type stuff = [fromMedia.ManageMediaArray, OrcaState];
@Injectable()
export class MediaEffects {

  @Effect()
  saveFav$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.SAVE_FAV),
      map((action: fromMedia.SaveFav) => action.payload),
      switchMap(({ userId, scoreId }) =>
        this.fbCateg.saveFavorite(userId, scoreId)
          .pipe(map(sucess => ({ sucess, userId, scoreId })))
      ),
      map(({ sucess, userId, scoreId }) => new fromUi.StopLoading())
    );
  // @Effect()
  // delFav$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromMedia.ActionTypes.DELETE_FAV),
  //     map((action: fromMedia.DeleteFav) => action.payload),
  //     switchMap(({ userId, scoreId }) =>
  //       this.fbCateg.deleteFavorite(userId, scoreId)
  //         .pipe(map(sucess => ({ sucess, userId, scoreId })))
  //     ),
  //     map(({ sucess, userId, scoreId })=>new fromUi.StopLoading())
  //   );

  @Effect()
  fetchScore$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.FETCH_SCORE),
      map((action: fromMedia.FetchScore) => action.payload),
      switchMap((uid: string) => this.fbScore.fetchScore(uid)),
      tap(result => { console.log(result); }),
      map(result => {
        return new fromMusic.SetPartitura(result);
      })
    );

  @Effect()
  fetchCategory$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.FETCH_CATEGORY),
      map((action: fromMedia.FetchCategory) => action.payload),
      switchMap((type: string) => {
        return this.fbCateg.fetchCateg()
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
        this.fbScore.saveScore(score);
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
        return this.fbStorage.upload(
          payload.file,
          payload.user.setPath(payload.file.tipo)
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
            return this.fbStorage.upload(u, score.setPath(u.tipo, u))
              .pipe(map(o => ({ origin: o, type: u.tipo })));
          }),
          tap(({ origin, type }) => {
            console.log('tap');
            score.addMediaOrigen(type, origin);
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
        const type: MediaTipo = payload.file.tipo;
        const score = new Score(payload.score);
        return this.fbStorage.upload(
          payload.file,
          score.setPath(type, payload.file)
        )
          .pipe(
            map(origin => {
              return new fromMusic.AddOrigin({ origin: origin, type: payload.file.tipo });
            })
          );
      })
    );

  @Effect()
  postCateg$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.POST_CATEGORY),
      map((action: fromMedia.PostCateg) => action.payload),
      switchMap(p => this.fbCateg.updateCateg(p.tipo, p.categoria).pipe(map(sucess => ({ p, sucess })))),
      map(({ p, sucess }) => (sucess)
        ? new fromMusic.AddCategory(p)
        : new fromUi.StopLoading()// new Error("No se pudo subir la nueva categoria")
      ),
      // (e => { console.error(e); return new fromUi.StopLoading() })
    );


  constructor(
    private actions$: Actions,
    private store$: Store<OrcaState>,
    private fbStorage: FirestorageService,
    private fbScore: ScoreService,
    private fbCateg: CategoriesService,
  ) { }
}
