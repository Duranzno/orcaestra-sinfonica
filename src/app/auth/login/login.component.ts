import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UIService, AuthService } from '../../core/services';
import { IUser, User } from '../../core/models/user.model';
import { OrcaState } from '../../core/store';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../core/store/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  private $loading: Subscription;
  constructor(private authService: AuthService, private store: Store<OrcaState>, private uiService: UIService) { }

  ngOnInit() {
    this.$loading = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }
  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.login({ email, password });
    // this.store.dispatch(new fromAuth.SetAuthenticated(user));
  }
  ngOnDestroy() {
    this.$loading.unsubscribe();
  }
}
