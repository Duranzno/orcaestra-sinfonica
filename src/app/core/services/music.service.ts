import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { IScore } from '../models/score.model';
import { From, OrcaState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private dpSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private store: Store<OrcaState>) { }

  setPartitura(mock: IScore) {
    this.store.dispatch(new From.music.SetPartitura(mock));

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
