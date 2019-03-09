import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../../core/services';
import { Store } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { OrcaState } from '../../core/store';

import { From } from '../../core/store';

import { MediaType, OriginType, UploadFile } from '../../core/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit {
  isLoading$: Observable<boolean>;
  grupos$: Observable<string[]>;
  type = MediaType.AVATAR;
  data: User;
  files: UploadFile[];
  constructor(
    private authService: AuthService,
    private store: Store<OrcaState>,
  ) { }

  ngOnInit() {
    // this.authService.fetchGrupos();
    this.isLoading$ = this.store.select(From.ui.getIsLoading);
    this.grupos$ = this.store.select(From.music.getGrupos);
  }
  getAvatarFile(files: UploadFile[]) {
    this.files = files;
  }
  onSubmit(form: NgForm) {
    const user = new User({
      email: form.value.email,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      password: form.value.password,
      group: form.value.grupo,
      isAdmin: (form.value.isAdmin === '') ? false : true,
    });
    this.authService.registerUser(user, this.files[0]);

  }

}
