import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../../core/services';
import { Store } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { OrcaState } from '../../core/store';

import { From } from '../../core/store';

import { MediaTipo, OrigenTipo, IUploadFile } from '../../core/models';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit, OnDestroy {
  $loading: Observable<boolean>;
  $grupos: Observable<string[]>;
  $subs = new Subscription();
  tipo = MediaTipo.AVATAR;
  isAdmin = false;
  files: IUploadFile[] = [];
  constructor(
    private authService: AuthService,
    private store: Store<OrcaState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.$subs.add(this.route.paramMap.subscribe(
      (p: ParamMap) => {
        if (p.get('tipo') === 'docentes' || p.get('tipo') === 'docente') {
          this.isAdmin = true;
          console.log("Cuenta de Docente")
        }
      }))
    // this.authService.fetchGrupos();
    this.$loading = this.store.select(From.ui.getIsLoading);
    this.$grupos = this.store.select(From.music.getGrupos);
  }
  getAvatarFile(files: IUploadFile[]) {
    this.files = files;
  }
  onSubmit(form: NgForm) {
    const iUser = form.value;
    const user = new User({ ...iUser, isAdmin: this.isAdmin });


    this.authService.registerUser(user, (this.files.length >= 1) ? this.files.pop() : null);
  }
  ngOnDestroy() {
    this.$subs.unsubscribe();
  }

}
