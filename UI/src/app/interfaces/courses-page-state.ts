import { CoursesListItem } from './courses-list-item';

export interface ICoursesPageState {
  textFragment: string;
  courses: CoursesListItem[];
  next: boolean;
}
