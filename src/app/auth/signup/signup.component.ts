import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../../core/services';
import { Store } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { OrcaState } from '../../core/store';

import { From } from '../../core/store';

import { MediaTipo, OrigenTipo, IUploadFile } from '../../core/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit {
  $loading: Observable<boolean>;
  $grupos: Observable<string[]>;
  tipo = MediaTipo.AVATAR;
  files: IUploadFile[] = [];
  constructor(
    private authService: AuthService,
    private store: Store<OrcaState>,
  ) { }

  ngOnInit() {
    // this.authService.fetchGrupos();
    this.$loading = this.store.select(From.ui.getIsLoading);
    this.$grupos = this.store.select(From.music.getGrupos);
  }
  getAvatarFile(files: IUploadFile[]) {
    this.files = files;
  }
  onSubmit(form: NgForm) {
    const iUser = form.value;
    const user = new User(iUser);

    this.authService.registerUser(user, (this.files.length >= 1) ? this.files.pop() : null);
  }

}
