import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() drawerToggle = new EventEmitter<void>();
  @Input() matDrawerShow;

  user$: Observable<User>;
  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.user$ = this.store.select(fromRoot.getUser);
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  onToggleDrawer() {
    this.drawerToggle.emit();
  }
  onLogout() {
    this.authService.logout();
  }

}
