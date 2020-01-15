import { Action } from '@ngrx/store';
import { IUser } from 'src/app/interfaces/user';
import { IAuthState } from 'src/app/interfaces/auth-state';
import { UserInfo } from 'src/app/interfaces/user-info';
import { TokenRequestModel } from 'src/app/interfaces/token-request-model';

export enum EAuthActions {
  toLogRequest = '[Auth] Log Request',
  toLogSuccess = '[Auth] Log Success',
  toLogFailed = '[Auth] Log Failed',
  toLogOut = '[Auth] Log Out',
  toUserRequest = '[Auth] User Request',
  toUserSuccess = '[Auth] User Success',
  toGetLocalTokenRequest = '[Auth] Get Local Token Request',
  toGetLocalTokenSuccess = '[Auth] Get Local Token Success',
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

export class LogOut implements Action {
  public readonly type = EAuthActions.toLogOut;
}

export class UserRequest implements Action {
  public readonly type = EAuthActions.toUserRequest;
  constructor(public payload: TokenRequestModel['token']) {}
}

export class UserSuccess implements Action {
  public readonly type = EAuthActions.toUserSuccess;
  constructor(public payload: UserInfo) {}
}

export class GetLocalTokenRequest implements Action {
  public readonly type = EAuthActions.toGetLocalTokenRequest;
}

export class GetLocalTokenSuccess implements Action {
  public readonly type = EAuthActions.toGetLocalTokenSuccess;
  constructor(public payload: IAuthState['token']) {}
}

export type AuthActions =
    UserRequest | UserSuccess
  | LogRequest | LogSuccess | LogFailed | LogOut
  | GetLocalTokenRequest | GetLocalTokenSuccess;
