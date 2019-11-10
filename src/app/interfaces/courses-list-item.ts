import { Moment } from 'moment';

export interface CoursesListItem {
  Id: number;
  Title: string;
  CreationDate: Moment;
  Duration: string;
  Description: string;
}
