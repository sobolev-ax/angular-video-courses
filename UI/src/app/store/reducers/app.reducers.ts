import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth.reducers';
import { commonReducer } from './common.reducers';
import { coursesReducer } from './courses.reducer';

export const appReducers: ActionReducerMap<any, any> = {
  auth: authReducer,
  common: commonReducer,
  courses: coursesReducer,
};
