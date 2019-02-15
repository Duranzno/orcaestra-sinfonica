import { Component, OnInit } from '@angular/core';
import { OrcaState, from } from '../core/store';
import { Store } from '@ngrx/store';
import { MediaType, Score } from '../core/models';
import { mockSheet } from '../core/mock';

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
  show(files: File[]) {
    console.log(files);
  }
  ngOnInit() {
    this.store.select(from.ui.getIsLoading).subscribe(x => this.state.ui = x);
    this.store.select(from.auth.getAuthState).subscribe(x => this.state.auth = x);
    this.store.select(from.music.getPartitura).subscribe(x => this.state.music = x);
    this.store.select(from.music.getFavoritos).subscribe(x => this.state.favoritos = x);
    this.store.select(from.music.getGrupos).subscribe(x => this.state.grupos = x);
  }

}
