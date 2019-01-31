import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import * as fromAuth from '@core/store/auth';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { OrcaState } from '../core/store';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<OrcaState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.select(fromAuth.isAdmin).subscribe(x => console.log(x));
    let isAuth: boolean;
    this.store
      .select(fromAuth.isAuth)
      .pipe(map(x => isAuth = x));

    if (isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
