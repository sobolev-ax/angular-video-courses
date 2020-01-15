import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { ICoursesState } from 'src/app/interfaces/courses-state';
import { CoursesParams } from 'src/app/interfaces/courses-params';
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

export const getCoursesList = createSelector(
  courses,
  (state: ICoursesState): CoursesListItem[] => state.courses
);

export const canNextCoursesList = createSelector(
  courses,
  (state: ICoursesState): boolean => state.next
);
