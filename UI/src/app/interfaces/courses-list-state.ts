import { CoursesListItem } from './courses-list-item';

export interface CoursesListState {
  start: number;
  count: number;
  step: number;
  sort: string;
  filter: string;
  textFragment: string;
  courses: CoursesListItem[];
}
