import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { User } from '@core/models/user.model';
import { OrcaState } from '@core/store';

import * as fromUi from '@core/store/ui';
import * as fromAuth from '@core/store/auth';
import * as fromMusic from '@core/store/music';

import { create } from 'rxjs-spy';
import { tag } from 'rxjs-spy/operators/tag';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading$: Observable<boolean>;
  grupos$: Observable<string[]>;
  state: { isAdmin?: any, auth?: any, music?: any } = {};
  constructor(
    private authService: AuthService,
    private store: Store<OrcaState>,
  ) { }

  ngOnInit() {
    this.authService.fetchGrupos();
    this.isLoading$ = this.store.select(fromUi.getIsLoading);
    this.grupos$ = this.store.select(fromMusic.getGrupos).pipe(tag('grupos'));
    this.maxDate = new Date();
    this.store.select(fromAuth.getAuthState)
      .pipe(tag('authState'))
      .subscribe(x => this.state.auth = x);
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    const user: User = {
      email: form.value.email,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      password: form.value.password,
      group: form.value.grupo,
      isAdmin: form.value.isAdmin,
    };
    this.authService.registerUser(user);
    // this.store.dispatch(new fromAuth.SetAuthenticated(user));
  }
  ngOnDestroy() {
  }
}
