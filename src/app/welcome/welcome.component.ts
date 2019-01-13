import { Component, OnInit } from '@angular/core';
import * as fromUi from '../shared/ui.reducer';
import * as fromMusic from '../list/music.reducer';
import * as fromAuth from '../auth/auth.reducer';
import * as fromAll from '../app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {
  state: { ui?: any, auth?: any, music?: any } = {};
  constructor(private store: Store<fromAll.State>) { }
  ngOnInit() {
    this.store.select(fromAll.getIsLoading).subscribe(x => this.state.ui = x);
    this.store.select(fromAll.getAuthState).subscribe(x => this.state.auth = x);
    this.store.select(fromAll.getPartitura).subscribe(x => this.state.music = x);
  }

}
