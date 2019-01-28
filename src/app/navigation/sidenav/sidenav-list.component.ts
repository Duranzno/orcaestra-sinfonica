import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import { menus } from './menu-element';


import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Input() iconOnly = false;
  @Output() closeSidenav = new EventEmitter<void>();
  user$: Observable<User>;
  public menus = menus;

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
