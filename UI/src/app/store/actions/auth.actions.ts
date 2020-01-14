import { Action } from '@ngrx/store';
import { IUser } from 'src/app/interfaces/user';
import { IAuthState } from 'src/app/interfaces/auth-state';

export enum EAuthActions {
  toLogRequest = '[Auth] Log Request',
  toLogSuccess = '[Auth] Log Success',
  toLogFailed = '[Auth] Log Failed',
  toUserRequest = '[Auth] User Request',
  toUserSuccess = '[Auth] User Success',
  toUserFailed = '[Auth] User Failed',
}

export class LogRequest implements Action {
  public readonly type = EAuthActions.toLogRequest;
  constructor(public payload: IUser) {}
}

export class LogSuccess implements Action {
  public readonly type = EAuthActions.toLogSuccess;
  constructor(public payload: string) {}
}

export class LogFailed implements Action {
  public readonly type = EAuthActions.toLogFailed;
  constructor(public payload: Error) {}
}

export class UserRequest implements Action {
  public readonly type = EAuthActions.toUserRequest;
  constructor(public payload: IAuthState['token']) {}
}

export class UserSuccess implements Action {
  public readonly type = EAuthActions.toUserSuccess;
  constructor(public payload: IUser) {}
}

export class UserFailed implements Action {
  public readonly type = EAuthActions.toUserFailed;
  constructor(public payload: Error) {}
}

export type AuthActions = LogRequest | LogSuccess | LogFailed;
