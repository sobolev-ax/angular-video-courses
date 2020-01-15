import { initialAuthState } from './auth.state';
import { IAppState } from 'src/app/interfaces/app-state';
import { initialCommonState } from './common.state';
import { initialCoursesState } from './courses.state';

export const initialAppState: IAppState = {
  auth: initialAuthState,
  common: initialCommonState,
  courses: initialCoursesState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
