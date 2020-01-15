import { RouterReducerState } from '@ngrx/router-store';
import { IAuthState } from './auth-state';
import { ICommonState } from './common-state';
import { ICoursesState } from './courses-state';

export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
  common: ICommonState;
  courses: ICoursesState;
}
