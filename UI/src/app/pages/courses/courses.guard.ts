import {
    CanActivate
  , ActivatedRouteSnapshot
  , RouterStateSnapshot
  , Router
  , UrlTree
} from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) : Observable<boolean> | boolean | UrlTree {

    if (!this.authService.isAuthenticated()) {
      return this.router.parseUrl('/login');
    }

    return false;
  }
}
