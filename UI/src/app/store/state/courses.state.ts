import { ICoursesState } from 'src/app/interfaces/courses-state';

export const initialCoursesState: ICoursesState = {
  start: 0,
  count: 0,
  step: 7,
  sort: '',
  filter: '',
  textFragment: '',
  courses: [],
  next: true,
};
