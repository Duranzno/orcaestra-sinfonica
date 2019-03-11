import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {
  wave: any;
  $loading: Observable<boolean>;
  constructor(private store: Store<OrcaState>) {
  }
  ngOnInit(): void {
    this.$loading = this.store.select(From.ui.getIsLoading);
  }
  load() {
    this.store.dispatch(new From.ui.StartLoading());
  }
  unload() {
    this.store.dispatch(new From.ui.StopLoading());
  }
  categ() {
    this.store.dispatch(new From.media.FetchScore('K70tVHelRRpIiDoq6OPb'));
  }

}
