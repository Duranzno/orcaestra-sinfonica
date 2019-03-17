import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaTipo } from '../core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take, filter } from 'rxjs/operators';
import { MessagingService } from '../core/services/messaging.service';

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
    private store: Store<OrcaState>,
    private msg: MessagingService) {
  }
  ngOnInit(): void {
    this.$loading = this.store.select(From.ui.getIsLoading);
    this.form = this._fb.group({ generos: this._fb.array([]) })
    this.store.select(From.auth.getUser)
      .pipe(
        filter(user => !!user), // filter null
        take(1) // take first real user
      ).subscribe(user => {
        if (user) {
          this.msg.init(user);
        }
      })
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
