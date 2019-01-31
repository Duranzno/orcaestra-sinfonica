import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { IScore } from '@core/models/partitura.interface';
import { UIService } from './ui.service';
import * as fromMusic from '@core/store/music';

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
    this.store.dispatch(new fromMusic.SetPartitura(mock));
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
