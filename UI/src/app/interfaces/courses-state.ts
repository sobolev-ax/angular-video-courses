import { CoursesListItem } from './courses-list-item';

export interface ICoursesState {
  start: number;
  count: number;
  step: number;
  sort: string;
  filter: string;
  textFragment: string;
  courses: CoursesListItem[];
  next: boolean;
  selected: CoursesListItem;
}
