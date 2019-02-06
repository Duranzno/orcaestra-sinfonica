import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { UIService } from '@core/services/ui.service';
import { IUser, User } from '../../core/models/user.model';
import { OrcaState } from '~/app/core/store';
import { Store } from '@ngrx/store';
import * as fromAuth from '@core/store/auth';
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
    const user: User = new User();
    user.email = this.form.value.email;
    user.password = this.form.value.password;
    // this.authService.login(user);
    this.store.dispatch(new fromAuth.SetAuthenticated(user));
    console.log(user);
  }
  ngOnDestroy() {
    this.$loading.unsubscribe();
  }
}
