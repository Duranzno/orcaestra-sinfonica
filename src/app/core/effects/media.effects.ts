import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { finalize, map, mergeMap, switchMap, tap, withLatestFrom, catchError, last } from 'rxjs/operators';
import { MediaTipo, Score, Origen, IUploadFile, IScoreId } from '../models';
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
      map(({ sucess, userId, scoreId }) => new fromMedia.FetchFav({ userId }))
    );
  @Effect()
  deleteFav$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.DELETE_FAV),
      map((action: fromMedia.SaveFav) => action.payload),
      switchMap(({ userId, scoreId }) =>
        this.fbCateg.deleteFavorite(userId, scoreId)
          .pipe(map(sucess => ({ sucess, userId, scoreId })))
      ),
      map(({ sucess, userId, scoreId }) => new fromMedia.FetchFav({ userId }))
    );

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
  fetchFavorites$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.FETCH_FAV),
      map((action: fromMedia.FetchFav) => action.payload),
      switchMap(({ userId }) => {
        return this.fbScore.getFavScores(userId)
          .pipe(
            map(result => {
              return new fromMusic.SetFavorites(result);
            })
          );
      })
    );

  @Effect()
  saveScore$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.SAVE_SCORE),
      map((action: fromMedia.SaveScore) => action.payload),
      switchMap((score) => {
        this.store$.dispatch(new fromMusic.SetPartitura(score));
        return this.fbScore.saveScore(score);
      }),
      map((id) => {
        this.store$.dispatch(new fromMusic.SetId(id));
        return new fromUi.StopLoading()
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
          mergeMap((u: IUploadFile, index) => {
            console.log(JSON.stringify(u), index);

            return this.fbStorage.upload(u, score.setPath(u.tipo, u))
              .pipe(map((o: Origen) => ({ origin: o, type: u.tipo, instr: u.instr })));
          }),
          tap(({ origin, type, instr }) => {
            console.log('tap');
            score.addMediaOrigen(type, origin, instr);
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
        this.store$.dispatch(new fromUi.StartLoading())
        return this.fbStorage.upload(
          payload.file,
          score.setPath(type, payload.file)
        ).pipe(
          map(origin => {
            this.store$.dispatch(new fromMusic.AddOrigin({ origin: origin, type: payload.file.tipo }));
          }),
          last(),
          map((v) => { console.log(v); return new fromUi.StopLoading(); })
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
