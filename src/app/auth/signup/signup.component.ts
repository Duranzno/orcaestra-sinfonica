import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

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
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.authService.fetchGrupos();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.grupos$ = this.store.select(fromRoot.getGrupos);
    this.maxDate = new Date();
    this.store.select(fromRoot.getAuthState).subscribe(x => this.state.auth = x);
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    const user: User = {
      email: form.value.email,
      nombre: '', // form.value.nombre,
      apellido: '', // form.value.apellido,
      password: form.value.password,
      group: form.value.grupo,
      isAdmin: form.value.isAdmin,
    };
    this.authService.registerUser(user);
    console.log(user);
  }
  ngOnDestroy() {
  }
}
