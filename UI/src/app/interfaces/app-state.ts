import { RouterReducerState } from '@ngrx/router-store';
import { IAuthState } from './auth-state';
import { ICommonState } from './common-state';

export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
  common: ICommonState;
}
