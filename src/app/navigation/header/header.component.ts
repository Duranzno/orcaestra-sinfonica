import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthService } from '../../core/services';
import { Store } from '@ngrx/store';
import { User, IUser } from '../../core/models';
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

  $isAuth = of(false);
  $isAdmin = of(false);
  constructor(
    private store: Store<OrcaState>
  ) { }

  ngOnInit() {
    this.$isAdmin = this.store.select(From.auth.isAdmin);
    this.$isAuth = this.store.select(From.auth.isAuth);
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  onToggleDrawer() {
    this.drawerToggle.emit();
  }

}
