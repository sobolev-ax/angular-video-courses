import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth.reducers';

export const appReducers: ActionReducerMap<any, any> = {
  auth: authReducer
};
