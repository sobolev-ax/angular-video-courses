import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../interfaces/app-state';
import { selectAuthToken } from '../store/selectors/auth.selector';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<IAppState>,) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken: string;

    this.store.pipe(select(selectAuthToken), take(1)).subscribe(token => authToken = token);

    if (authToken.length) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
