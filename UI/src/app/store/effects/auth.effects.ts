import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom, switchMapTo, catchError } from 'rxjs/operators';

import { IAppState } from '../state/app.state';

import {
  EAuthActions,
  LogRequest,
  LogSuccess,
  LogFailed,
} from '../actions/auth.actions';

import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user';
import { UserInfo } from '../../interfaces/user-info';


@Injectable()
export class AuthEffects {

  constructor(
    private authService: AuthService,
    private actions$: Actions,
  ) {}

  @Effect()
  logRequest$ = this.actions$.pipe(
    ofType<LogRequest>(EAuthActions.toLogRequest),
    switchMap((data) => {
      const mail = data.payload.email;
      const pswd = data.payload.password;

      return this.authService
        .toLogin(mail, pswd)
        .pipe(
          map(credentials => new LogSuccess(credentials.token)),
          catchError(error => of(new LogFailed(error)))
        );
    })
  );
}
