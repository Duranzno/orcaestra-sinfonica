import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  private $loading: Subscription;
  constructor(private authService: AuthService, private uiService: UIService) { }

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
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService.login(user);
    console.log(user);
  }
  ngOnDestroy() {
    this.$loading.unsubscribe();
  }
}
