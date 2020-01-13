import { RouterReducerState } from '@ngrx/router-store';

import { IAuthState, initialAuthState } from './auth.state';

export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
  loading: boolean;
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  loading: false,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
