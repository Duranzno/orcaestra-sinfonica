import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  template: `
  <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="1em">
  <mat-card fxFlex>
  </mat-card>
  </div>
  `,
  styleUrls: []
})
export class WelcomeComponent implements OnInit, OnDestroy {
  $subs = new Subscription()
  grupos: string[]
  $loading: Observable<boolean>;
  constructor(
    private store: Store<OrcaState>
  ) { }

  ngOnInit(): void {
    this.$loading = this.store.select(From.ui.getIsLoading);
    this.$subs.add(this.store.select(From.music.getGrupos).subscribe(g => this.grupos = (g) ? g : []))
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe();
  }
}
