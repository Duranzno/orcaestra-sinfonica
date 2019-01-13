import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { IScore } from '../shared/models/partitura.interface';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Music from './music.actions';
import * as fromMusic from './music.reducer';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private dpSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromMusic.State>) { }

  setPartitura(mock: IScore) {
    this.store.dispatch(new Music.SetPartitura(mock));
  }

  // fetchPartituras() {
  //   this.store.dispatch(new UI.StartLoading());
  //   this.dpSubs.push(
  //     this.db
  //       .collection('partituras')
  //       .snapshotChanges()
  //       .map(docArray => {
  //         return docArray.map(doc > {
  //           return {
  //           }
  //         })
  //       })
  //   )
  // }


}
