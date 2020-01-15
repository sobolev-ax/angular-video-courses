import { createSelector } from '@ngrx/store';
import { IAppState } from '../../interfaces/app-state';
import { ICoursesState } from '../../interfaces/courses-state';
import { CoursesParams } from '../../interfaces/courses-params';
import { ICoursesPageState } from '../../interfaces/courses-page-state';
import { CoursesListItem } from 'src/app/interfaces/courses-list-item';

const courses = (state: IAppState) => state.courses;

export const getCoursesParams = createSelector(
  courses,
  (state: ICoursesState): CoursesParams => ({
    start: String(state.start),
    count: String(state.count),
    textFragment: state.textFragment,
  })
);

export const getCoursesPageState = createSelector(
  courses,
  (state: ICoursesState): ICoursesPageState => ({
    textFragment: state.textFragment,
    courses: state.courses,
    next: state.next,
  })
);

export const getSelectedCourse = createSelector(
  courses,
  (state: ICoursesState): CoursesListItem => state.selected,
);
