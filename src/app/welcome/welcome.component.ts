import { Component, OnInit } from '@angular/core';
import { OrcaState, } from '@core/store';
import { Store } from '@ngrx/store';
import * as fromAuth from '@core/store/auth';
import * as fromUi from '@core/store/ui';
import * as fromMusic from '@core/store/music';
import { MediaType, User, Score } from '../core/models';
import { mockSheet, mockUser } from '../shared/mock';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {
  state: { ui?: any, auth?: any, music?: any, grupos?: any, favoritos?: any } = {};
  public type: MediaType = MediaType.MXML;
  public data: Score = mockSheet;
  constructor(private store: Store<OrcaState>) { }
  ngOnInit() {
    this.store.select(fromUi.getIsLoading).subscribe(x => this.state.ui = x);
    this.store.select(fromAuth.getAuthState).subscribe(x => this.state.auth = x);
    this.store.select(fromMusic.getPartitura).subscribe(x => this.state.music = x);
    this.store.select(fromMusic.getFavoritos).subscribe(x => this.state.favoritos = x);
    this.store.select(fromMusic.getGrupos).subscribe(x => this.state.grupos = x);
  }

}
