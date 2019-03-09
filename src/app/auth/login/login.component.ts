import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { UIService, AuthService } from '../../core/services';
import { OrcaState, From } from '../../core/store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  $loading = of(false);
  constructor(
    private authService: AuthService,
    private store: Store<OrcaState>,
    private uiService: UIService,
    private router: Router) { }

  ngOnInit() {
    this.$loading = this.store.select(From.ui.getIsLoading);
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
  }
}
