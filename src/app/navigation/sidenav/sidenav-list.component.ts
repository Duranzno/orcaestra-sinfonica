import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { menus, Menu } from './menu-element';
import * as fromAuth from '@core/store/auth';
import { AuthService } from '@core/services/auth.service';
import { IUser } from '@core/models/user.model';
import { OrcaState } from '@core/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Input() iconOnly = false;
  @Output() closeSidenav = new EventEmitter<void>();
  @Input() subscriptions: Menu[] = [
    {
      'name': 'Navidad',
      'link': '#',
      'icon': 'input',
      'chip': false,
      'open': false,
      'admin': false,
    },
    {
      'name': 'LLaneras',
      'link': '#',
      'icon': 'input',
      'chip': false,
      'open': false,
      'admin': false,
    },
  ];

  user$: Observable<IUser>;
  public menus = menus.concat(this.subscriptions);

  constructor(private authService: AuthService, private store: Store<OrcaState>) { }

  ngOnInit() {
    this.user$ = this.store.select(fromAuth.getUser);
  }
  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.store.dispatch(new fromAuth.SetUnauthenticated());
  }
}
