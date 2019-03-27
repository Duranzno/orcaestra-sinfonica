import { Component, OnInit, Inject } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaTipo } from '../core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take, filter, tap } from 'rxjs/operators';
import { MessagingService, ScoreService, CategoriesService } from '../core/services';
import { APP_CONFIG } from '../app.config';
import { AppConfig } from '../app-config';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {
  tipo = CategoriaTipo.GENERO;
  $stuff: Observable<{}> = of({ "enmptyaf": "" });
  $loading: Observable<boolean>;
  constructor(
    private _fb: FormBuilder,
    private store: Store<OrcaState>,
    private router: Router,
    private fbScore: ScoreService,
    private fbCateg: CategoriesService,
    private msg: MessagingService,
    @Inject(APP_CONFIG) config: AppConfig) {
    console.log(config.windowExists);
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
          // this.$stuff = this.msg.currentMessage.pipe(tap(v=>console.log(v)))
          // this.msg.rec eiveMessages();

        }
      })
  }
  load() {
    // this.store.dispatch(new From.ui.StartLoading());
    this.router.navigateByUrl('admin/temp');
  }
  unload() {
    this.store.dispatch(new From.ui.StopLoading());
  }

}
