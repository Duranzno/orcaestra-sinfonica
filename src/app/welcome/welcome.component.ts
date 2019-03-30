import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';

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
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe();
  }
}
