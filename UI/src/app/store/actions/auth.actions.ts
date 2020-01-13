import { Action } from '@ngrx/store';
import { IUser } from 'src/app/interfaces/user';

export enum EAuthActions {
  toLogRequest = '[Auth] Log Request',
  toLogSuccess = '[Auth] Log Success',
}

export class LogRequest implements Action {
  public readonly type = EAuthActions.toLogRequest;
  constructor(public payload: IUser) {}
}

export class LogSuccess implements Action {
  public readonly type = EAuthActions.toLogSuccess;
  constructor(public payload: string) {}
}

export type AuthActions = LogRequest | LogSuccess;
