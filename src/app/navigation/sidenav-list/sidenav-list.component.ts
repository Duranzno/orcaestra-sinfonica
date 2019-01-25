import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.less']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  user$: Observable<User>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.user$ = this.store.select(fromRoot.getUser);
  }
  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
