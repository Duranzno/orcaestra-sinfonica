import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { menus, loggedOutMenu, Menu } from './menu-element';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/user.model';
import { OrcaState, from } from '../../core/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: []
})
export class SidenavListComponent implements OnInit {
  @Input() iconOnly = false;
  @Output() closeSidenav = new EventEmitter<void>();
  @Input() subscriptions: Menu[] = [
    {
      'name': 'Navidad',
      'link': '#',
      'icon': 'input',
      'isUser': true,
      'chip': false,
      'open': false,
      'isAdmin': false,
    },
    {
      'name': 'LLaneras',
      'link': '#',
      'icon': 'input',
      'isUser': true,
      'chip': false,
      'open': false,
      'isAdmin': false,
    },
  ];

  user$: Observable<IUser>;
  avatarSrc$: Observable<string>;

  public $menus: Observable<Menu[]>;

  constructor(private authService: AuthService, private store: Store<OrcaState>) { }

  ngOnInit() {
    this.user$ = this.store.select(from.auth.getUser);
    this.$menus = this.user$.pipe(map(
      (user) => {
        const findSub = (m: Menu) => m.name === 'Musica';
        if (user.nombre !== '') {
          return menus.reduce((arr: Menu[], m: Menu): Menu[] => {
            if (findSub(m)) {
              m.sub = this.subscriptions;
            }
            return arr.concat(m);
          }, []);
        }
        else {
          return loggedOutMenu;
        }
      }
    ));
    this.avatarSrc$ = this.store.select(from.auth.getAvatar);
    // this.store.dispatch(new fromAuth.SetAvatar('./assets/user.jpg'));
    // this.avatarSrc$% = this.store.select(fromMedia.getAvatar);
  }
  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.store.dispatch(new from.auth.SetUnauthenticated());
  }
}
