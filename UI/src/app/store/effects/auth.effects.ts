import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, finalize } from 'rxjs/operators';
import { EAuthActions, LogRequest, LogSuccess, LogFailed, GetLocalTokenSuccess, UserRequest, GetLocalTokenRequest,
  UserSuccess, LogOut} from '../actions/auth.actions';
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

  @Effect()
  logOut$ = this.actions$.pipe(
    ofType<LogOut>(EAuthActions.toLogOut),
    switchMap(() => {
      this.authService.deleteToken();

      return of();
    })
  );

  @Effect()
  getLocalTokenRequest$ = this.actions$.pipe(
    ofType<GetLocalTokenRequest>(EAuthActions.toGetLocalTokenRequest),
    switchMap(() => {

      this.store.dispatch(new LoadingOn());

      return this.authService
        .getAuthorizationToken()
        .pipe(
          map((token) => {
            return new GetLocalTokenSuccess(token);
          }),
          finalize(() => this.store.dispatch(new LoadingOff())),
        );
    })
  );

  @Effect()
  userRequest$ = this.actions$.pipe(
    ofType<UserRequest>(EAuthActions.toUserRequest),
    switchMap((token) => {
      this.store.dispatch(new LoadingOn());

      return this.authService
        .getUserInfo(token.payload)
        .pipe(
          map((user) => {
            return new UserSuccess(user);
          }),
          catchError(error => of(new LogFailed(error))),
          finalize(() => this.store.dispatch(new LoadingOff())),
        );
    })
  );
}
