import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as fromMedia from '@core/store/media';
import { UploadFile } from '../models';

@Injectable()
export class NameEffects {
  // @Effect()
  // firebaseUpload$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromMedia.ActionTypes.POST_MEDIA_FIREBASE),
  //     map((action: fromMedia.PostMediaF) => action.payload),
  //     map(files => files.forEach(this.MediaTypeResolver))

  //   )
  // private MediaTypeResolver(file: UploadFile) { }
  constructor(
    private actions$: Actions
  ) { }
}
