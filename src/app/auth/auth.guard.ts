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
import { isAdmin } from '../core/store/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuth: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<OrcaState>) {

    this.store.select(fromAuth.isAuth).subscribe(auth => this.isAuth = auth);
    this.store.select(fromAuth.isAdmin).subscribe(admin => this.isAdmin = admin);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
  canActivateAuth(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
