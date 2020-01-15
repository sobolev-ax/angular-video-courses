import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { checkAuth } from 'src/app/store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class CoursesGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<IAppState>,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) : Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(checkAuth)
    ).pipe(
      map((isAuth) => {
        if (!isAuth) {
          return this.router.parseUrl('/login');
        }
        return true;
      })
    );
  }
}
