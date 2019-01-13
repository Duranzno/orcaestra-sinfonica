import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromMusic from './music.reducer';
import * as Music from './music.actions';
import { IScore } from '../shared/models/partitura.interface';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private store: Store<fromMusic.State>) { }
  setPartitura(mock: IScore) {
    this.store.dispatch(new Music.SetPartitura(mock));
  }
}
