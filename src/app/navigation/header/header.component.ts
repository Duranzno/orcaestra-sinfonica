import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/services';
import { Store } from '@ngrx/store';
import { User } from '../../core/models';
import { OrcaState, From } from '../../core/store';

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
  constructor(private authService: AuthService, private store: Store<OrcaState>) { }

  ngOnInit() {
    this.user$ = this.store.select(From.auth.getUser);
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  onToggleDrawer() {
    this.drawerToggle.emit();
  }
  onLogout() {
    this.store.dispatch(new From.auth.SetUnauthenticated());
  }

}
