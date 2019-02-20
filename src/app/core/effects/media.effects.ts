import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromMedia from '../store/media';
import * as fromAuth from '../store/auth';

import { UploadFile, Score, User } from '../models';
import { FbStorageService } from '../services/upload/firebase.service';

@Injectable()
export class MediaEffects {
  // @Effect()
  // firebaseUpload$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromMedia.ActionTypes.POST_SCORE_MEDIA_FB),
  //     map((action: fromMedia.PostScoreMediaF) => action.payload),
  //     map(files => files.forEach(this.MediaTypeResolver))

  //   )
  // private MediaTypeResolver(file: UploadFile) {
  //   this.fbStorage.upload(file,)
  // }
  @Effect()
  postAvatarFb$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromMedia.ActionTypes.POST_AVATAR_FB),
      map((action: fromMedia.PostAvatarF) => action.payload),
      switchMap(payload => (this.MediaTypeResolver(payload.file, payload.user))),
      map(downloadUrl => { console.log(downloadUrl); return new fromAuth.SetAvatar(downloadUrl); })
      );

  private MediaTypeResolver(ufile: UploadFile, data: User | Score): Observable<string> {
    return this.fbStorage.upload(ufile.type, data, ufile.file);
  }
  constructor(
    private actions$: Actions,
    private fbStorage: FbStorageService,
  ) { }
}
