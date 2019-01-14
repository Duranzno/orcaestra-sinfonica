import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { getIsAdmin } from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading$: Observable<boolean>;
  grupos$: Observable<string[]>;
  state: { isAdmin?: any, auth?: any, music?: any } = {};
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.authService.fetchGrupos();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.grupos$ = this.store.select(fromRoot.getGrupos);
    this.maxDate = new Date();
    this.store.select(fromRoot.getAuthState).subscribe(x => this.state.auth = x);
    this.store.select(fromRoot.getIsAdmin).subscribe(x => this.state.isAdmin = x);

    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
      isAdmin: form.value.isAdmin,
      group: form.value.group,
    });
    console.log(form.value);
  }
  ngOnDestroy() {
  }
}
