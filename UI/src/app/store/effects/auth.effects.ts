import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, finalize } from 'rxjs/operators';
import { EAuthActions, LogRequest, LogSuccess, LogFailed, GetLocalTokenSuccess } from '../actions/auth.actions';
import { LoadingOn, LoadingOff } from '../actions/common.actions';

import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';

@Injectable()
export class AuthEffects {

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private store: Store<IAppState>,
  ) {}

  @Effect()
  logRequest$ = this.actions$.pipe(
    ofType<LogRequest>(EAuthActions.toLogRequest),
    switchMap((data) => {
      const mail = data.payload.email;
      const pswd = data.payload.password;

      this.store.dispatch(new LoadingOn());

      return this.authService
        .toLogin(mail, pswd)
        .pipe(
          map((credentials) => {
            return new LogSuccess(credentials.token);
          }),
          catchError(error => of(new LogFailed(error))),
          finalize(() => this.store.dispatch(new LoadingOff())),
        );
    })
  );

  // @Effect()
  // getLocalTokenRequest$ = this.actions$.pipe(
  //   ofType<LogRequest>(EAuthActions.toGetLocalTokenRequest),
  //   switchMap(() => {
  //     return this.authService
  //       .getAuthorizationToken();
  //       // .pipe(
  //       //   map((token) => {
  //       //     if (token.length === 0) return;

  //       //     return new GetLocalTokenSuccess(token);
  //       //   }),
  //       // );
  //   })
  // );
}
