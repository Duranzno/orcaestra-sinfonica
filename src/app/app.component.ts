import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {

  watcher$: Subscription;
  @Input() isVisible: boolean = true;// 1
  visibility = 'shown';

  sideNavOpened: boolean = true;// 1
  matDrawerOpened = false; // 0
  matDrawerShow: boolean = true; // 1
  sideNavMode: string = 'side';

  constructor(private authService: AuthService,
    private mediaObserver: MediaObserver) { }
  ngOnInit() {
    this.authService.initAuthListener();
    this.watcher$ = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.toggleView();


      console.log(`Sidenav ${this.sideNavMode} esta ${this.sideNavOpened} `)
      console.log(`MatDrawerOpened ${this.matDrawerOpened} esta ${this.matDrawerShow} `)
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
      console.log('grande');
    } else if (this.mediaObserver.isActive('gt-xs')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = false; // 0
      this.matDrawerOpened = true; // 1
      this.matDrawerShow = true; // 1
      console.log('mediano');
    } else if (this.mediaObserver.isActive('lt-sm')) {
      this.sideNavMode = 'over';
      this.sideNavOpened = false; // 0
      this.matDrawerOpened = false; // 0
      this.matDrawerShow = false; // 0
      console.log('pequeno');
    }
  }
  ngOnDestroy() {
    this.watcher$.unsubscribe();
  }
}
