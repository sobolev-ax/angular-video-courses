import { Action } from '@ngrx/store';

import { UserInfo } from 'src/app/interfaces/user-info';

export enum EAuthActions {
  getToken = '[Auth] Get Token',
  GetTokenSuccess = '[Auth] Get Token Success'
}

export class GetTokenRequest implements Action {
  public readonly type = EAuthActions.getToken;
}

export class GetTokenSuccess implements Action {
  public readonly type = EAuthActions.GetTokenSuccess;
  constructor(public payload: string) {}
}

export type AuthActions =
  | GetTokenRequest
  | GetTokenSuccess;
