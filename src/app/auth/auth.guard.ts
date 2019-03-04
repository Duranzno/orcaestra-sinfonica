import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import * as fromAuth from '../core/store/auth';
import { AuthService } from '../core/services/auth.service';
import { Store } from '@ngrx/store';
import { OrcaState } from '../core/store';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuth: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<OrcaState>) {
    this.store.select(fromAuth.isAuth)
      .subscribe(admin => this.isAuth = admin);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
