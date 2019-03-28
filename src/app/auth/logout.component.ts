import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrcaState, From } from '../core/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: [``]
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store<OrcaState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(new From.auth.SetUnauthenticated());
    this.router.navigateByUrl('/');
  }
  logout() {
  }
}
