import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IAuthState } from '../state/auth.state';

const auth = (state: IAppState) => state.auth;

export const selectAuthToken = createSelector(
  auth,
  (state: IAuthState) => state.token
);

