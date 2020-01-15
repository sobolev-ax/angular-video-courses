import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { ICommonState } from 'src/app/interfaces/common-state';

const common = (state: IAppState) => state.common;

export const getLoading = createSelector(
  common,
  (state: ICommonState): boolean => state.loading
);
