import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { IAuthState } from 'src/app/interfaces/auth-state';

const auth = (state: IAppState) => state.auth;

export const selectAuthToken = createSelector(
  auth,
  (state: IAuthState) => state.token
);

