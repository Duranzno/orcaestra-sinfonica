import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, filter, mergeMap, catchError } from 'rxjs/operators';
import * as fromMedia from '../store/media';
import * as fromAuth from '../store/auth';
import * as fromMusic from '../store/music';

import { UploadFile, Score, User } from '../models';
import { FirebaseService } from '../services/upload/firebase.service';

@Injectable()
export class MediaEffects {
  @Effect()
  firebaseUpload$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.POST_SCORE_MEDIA_FB),
      map((action: fromMedia.PostScoreMediaFb) => action.payload),
      // Here I have to upload the files to storage, update the local score data and the upload this score
      switchMap(payload => this.fb.addFilesToScore(payload.score, payload.files)),
      mergeMap(updatedScore => this.fb.saveScore(updatedScore)),
      map(score => new fromMusic.SetPartitura(score))
    );


  @Effect()
  postAvatarFb$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.POST_AVATAR_FB),
      map((action: fromMedia.PostAvatarF) => action.payload),
      switchMap(payload => (this.MediaTypeResolver(payload.file, payload.user))),
      map(downloadUrl => { console.log(downloadUrl); return new fromAuth.SetAvatar(downloadUrl); })
    );

  private MediaTypeResolver(ufile: UploadFile, data: User | Score): Observable<string> {
    return this.fb.upload(ufile, data);
  }
  constructor(
    private actions$: Actions,
    private fb: FirebaseService,
  ) { }
}
