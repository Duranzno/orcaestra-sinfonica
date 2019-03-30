import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  template: `
  <div fxLayout="column" fxLayout.gt-md="row" fxLayoutGap.gt-md="20px" fxLayoutAlign="center center">
  <div>
    <section>
      <h1>ACTIVITY</h1>
      <p>Stay active and enjoy better health and more fun!</p>
    </section>
    <section>
      <h1>COMMUNITY</h1>
      <p>Get to know other people who share your passion!</p>
    </section>
    <section>
      <h1>CHALLENGES</h1>
      <p>Never stop! Dive into new challenges every day</p>
    </section>
  </div>
  <button mat-raised-button [routerLink]="[ '/admin','temp' ]" routerLinkActive="active">
    name text
  </button>
</div>
  `,
  styleUrls: []
})
export class WelcomeComponent implements OnInit, OnDestroy {
  $subs = new Subscription()
  $loading: Observable<boolean>;
  constructor(
    private store: Store<OrcaState>
  ) { }

  ngOnInit(): void {
    this.$loading = this.store.select(From.ui.getIsLoading);
    this.store.select(From.auth.getUser).subscribe(u=>console.log(u))
    this.$subs.add(
      this.store.select(From.auth.getUid)
        .subscribe((id) => {
          console.log(`El id del usuario es ${id}`);
          // if (environment.production && this.msg.getToken())
          if (id && id !== '')
            this.store.dispatch(new From.auth.UploadFCM('enllUnrsGAI:APA91bGydRb7YCtU4WQBVDu-r0x1HY3imyB_9mpGkR7lb_k76p26_ZqeOBWS13XNifktjpKiIJeom10bGzBiZKmsEONJdhxq9WaiTV7_pNpNqhtO3se5exHysDLz6lRXcjnNuz1zWZTK'))
          // this.msg.monitorRefresh()
          // .then(fcmToken => this.store.dispatch(new From.auth.UploadFCM(fcmToken)))
        })
    )
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe();
  }
}
