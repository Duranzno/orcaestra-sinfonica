import { Component, OnInit, Input } from '@angular/core';
import { Menu } from './menu-element';
import { Store } from '@ngrx/store';
import { OrcaState, from } from 'src/app/core/store';

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent implements OnInit {

  @Input() menu;
  @Input() iconOnly: boolean;
  @Input() secondaryMenu = false;

  constructor(private store: Store<OrcaState>) { }

  ngOnInit() {
  }

  openLink() {
    this.menu.open = this.menu.open;
  }

  chechForChildMenu() {
    return (this.menu && this.menu.sub) ? true : false;
  }
}
