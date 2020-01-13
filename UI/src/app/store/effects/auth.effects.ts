import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom, switchMapTo } from 'rxjs/operators';

import { IAppState } from '../state/app.state';

import {
  EAuthActions,
  LogRequest,
  LogSuccess,
} from '../actions/auth.actions';

import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user';
import { UserInfo } from '../../interfaces/user-info';


@Injectable()
export class AuthEffects {
  @Effect()
  logRequest$ = this.actions$.pipe(
    ofType<LogRequest>(EAuthActions.toLogRequest),
    switchMap(() => {
      return 'qqqqq';
    })
  );

  constructor(
    private authService: AuthService,
    private actions$: Actions,
  ) {}
}
