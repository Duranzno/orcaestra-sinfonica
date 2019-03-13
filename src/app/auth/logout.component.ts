import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrcaState, From } from '../core/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `<button mat-raised-button (click)="logout()">Salir</button>`,
  styles: [``]
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store<OrcaState>, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.store.dispatch(new From.auth.SetUnauthenticated());
    this.router.navigateByUrl('bienvenida');
  }
}
