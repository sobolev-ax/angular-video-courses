import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { IAuthState } from 'src/app/interfaces/auth-state';
import { UserInfo } from 'src/app/interfaces/user-info';

const auth = (state: IAppState) => state.auth;

export const selectAuthToken = createSelector(
  auth,
  (state: IAuthState): string => state.token
);

export const checkAuth = createSelector(
  auth,
  (state: IAuthState): boolean => state.token.length > 0
);

export const getUser = createSelector(
  auth,
  (state: IAuthState): UserInfo => state.user
);
