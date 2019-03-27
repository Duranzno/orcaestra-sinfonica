import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaTipo } from '../core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take, filter, tap } from 'rxjs/operators';
import { MessagingService, UIService } from '../core/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit, OnDestroy {
  $subs = new Subscription()
  $loading: Observable<boolean>;
  constructor(
    private store: Store<OrcaState>,
    private router: Router,
    private msg: MessagingService,
    private ui: UIService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new From.ui.ShowSnackbar({ message: "test", duration: 5, action: 'asdasd' }))
    this.$loading = this.store.select(From.ui.getIsLoading);
    if (environment.production) {
      this.$subs.add(this.store.select(From.auth.getUser)
        .pipe(
          filter(user => !!user), // filter null
          take(1) // take first real user
        ).subscribe((user) => {
          if (environment.production && this.msg.getToken()) {
            this.msg.saveToken(user, this.msg.getToken())
            this.msg.monitorRefresh(user)
          }
        }))
    }
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe();
  }
}
