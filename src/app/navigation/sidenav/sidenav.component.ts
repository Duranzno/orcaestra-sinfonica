import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserMenu, AnonMenu, IMenu, Menu } from './menu.elements';
import { AuthService } from '../../core/services/auth.service';
import { IUser, User } from '../../core/models/user.model';
import { OrcaState, From } from '../../core/store';
import { map, tap } from 'rxjs/operators';
import { mapMenuAdmin, mapMenuGenres } from './menu.mapper';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Input() iconOnly = false;
  @Output() closeSidenav = new EventEmitter<void>();
  @Input() public userSubs: IMenu[] = [
    {
      'name': 'Favoritos',
      'link': '/music',
      'icon': 'input',
      'isUser': true,
      'chip': false,
      'open': false,
      'isAdmin': false,
    }
  ];
  private subscription = new Subscription();
  $user: Observable<IUser>;
  $avatarSrc: Observable<string>;
  $grupo: Observable<string>;
  public menus: IMenu[];
  public $menus: Observable<IMenu[]>;
  public anonMenu = AnonMenu;

  constructor(
    private store: Store<OrcaState>
  ) { }

  ngOnInit() {
    this.$user = this.store.select(From.auth.getUser);
    this.$grupo = this.store.select(From.auth.getGroup);
    this.$menus = this.$user.pipe(
      map(iUser => {
        const user = new User(iUser);
        const adminMenu = mapMenuAdmin(iUser);
        return mapMenuGenres(iUser, this.userSubs, adminMenu);
      })
    );
    this.subscription.add(this.$menus.subscribe(m => this.menus = m));
    this.subscription.add(this.$grupo.subscribe(g => this.userSubs.push(new Menu({
      name: g,
      link: `/music/lista/${g}`
    }))));
    this.$avatarSrc = this.store.select(From.auth.getAvatar);
  }
  onClose() {
    this.closeSidenav.emit();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onLogout() {
    this.onClose();
    this.store.dispatch(new From.auth.SetUnauthenticated());
  }
}
