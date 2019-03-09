import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { Subscription } from 'rxjs';
import { AuthService } from './core/services';
import { SwUpdate } from '@angular/service-worker';
import { OrcaState, From } from './core/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {

  watcher$: Subscription;
  @Input() isVisible: boolean = true; // 1
  visibility = 'shown';

  sideNavOpened: boolean = true; // 1
  matDrawerOpened = false; // 0
  matDrawerShow: boolean = true; // 1
  sideNavMode: string = 'side';

  constructor(
    private authService: AuthService,
    private mediaObserver: MediaObserver,
    private swUpdate: SwUpdate,
    private store: Store<OrcaState>
  ) { }
  ngOnInit() {
    if (window) {
      if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
          if (confirm('Nueva version de Orcaestra Sinfonica Disponible.¿Quiere descargarla?')) {
            window.location.reload();
          }
        });
      }
    }
    this.store.dispatch(new From.media.FetchCategory());
    this.authService.initAuthListener();
    this.watcher$ = this.mediaObserver.media$
      .subscribe((change: MediaChange) => {
        this.toggleView();
      });
  }
  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

  toggleView() {
    if (this.mediaObserver.isActive('gt-md')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = true; // 1
      this.matDrawerOpened = false; // 0
      this.matDrawerShow = true; // 1
    } else if (this.mediaObserver.isActive('gt-xs')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = false; // 0
      this.matDrawerOpened = true; // 1
      this.matDrawerShow = true; // 1
    } else if (this.mediaObserver.isActive('lt-sm')) {
      this.sideNavMode = 'over';
      this.sideNavOpened = false; // 0
      this.matDrawerOpened = false; // 0
      this.matDrawerShow = false; // 0
    }
  }
  ngOnDestroy() {
    this.watcher$.unsubscribe();
  }
}
