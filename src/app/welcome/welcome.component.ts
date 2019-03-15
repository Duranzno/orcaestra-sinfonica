import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../core/services';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {
  wave: any;
  scores;
  $loading: Observable<boolean>;
  constructor(private store: Store<OrcaState>, private router: Router, private fb: FirebaseService) {
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
    this.scores = this.fb.getScoreList({ path: 'generos', val: 'Clasico' });
  }

}
