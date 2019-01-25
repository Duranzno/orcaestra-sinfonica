import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['./app.component.less']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isVisible = true; // 1
  visibility = 'shown';
  watcher$: Subscription;
  sideNavOpened = true; // 1
  matDrawerOpened = false; // 0
  matDrawerShow = true; // 1
  sideNavMode = 'side';

  constructor(private authService: AuthService,
    private mediaObserver: MediaObserver) { }
  ngOnInit() {
    this.authService.initAuthListener();
    this.watcher$ = this.mediaObserver.media$.subscribe((change: MediaChange) => {
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
