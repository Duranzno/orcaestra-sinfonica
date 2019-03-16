import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaTipo } from '../core/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {
  array = ["1", "2", "2"]
  tipo = CategoriaTipo.GENERO;
  form: FormGroup;
  $loading: Observable<boolean>;
  constructor(
    private _fb: FormBuilder,
    private store: Store<OrcaState>) {
  }
  ngOnInit(): void {
    this.$loading = this.store.select(From.ui.getIsLoading);
    this.form = this._fb.group({ generos: this._fb.array([]) })
  }
  load() {
    this.store.dispatch(new From.ui.StartLoading());
  }
  unload() {
    this.store.dispatch(new From.ui.StopLoading());
  }
  categ() {
    // this.scores = this.fb.getScoreList({ path: 'generos', val: 'Clasico' });
  }

}
