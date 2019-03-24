import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaTipo } from '../core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take, filter } from 'rxjs/operators';
import { MessagingService, ScoreService, CategoriesService } from '../core/services';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {
  tipo = CategoriaTipo.GENERO;
  $stuff;
  $loading: Observable<boolean>;
  constructor(
    private _fb: FormBuilder,
    private store: Store<OrcaState>,
    private fbScore: ScoreService,
    private fbCateg: CategoriesService,
    // private msg: MessagingService
  ) {
  }
  ngOnInit(): void {

    this.$loading = this.store.select(From.ui.getIsLoading);
    this.store.select(From.auth.getUser)
      .pipe(
        filter(user => !!user), // filter null
        take(1) // take first real user
      ).subscribe(user => {
        if (user) {
          // this.msg.getPermission(user)
          // this.msg.monitorRefresh(user)
          // this.msg.receiveMessages()
        }
      })
  }
  load() {
    // this.store.dispatch(new From.ui.StartLoading());
    this.$stuff = this.fbCateg.unsubscribeCateg('mypropiaiderronea2', 'IMA', CategoriaTipo.GRUPOS)
  }
  unload() {
    this.store.dispatch(new From.ui.StopLoading());
  }

}
