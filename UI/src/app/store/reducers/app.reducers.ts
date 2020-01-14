import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth.reducers';
import { commonReducer } from './common.reducers';

export const appReducers: ActionReducerMap<any, any> = {
  auth: authReducer,
  common: commonReducer,
};
