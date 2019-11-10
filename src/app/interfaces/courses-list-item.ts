import { Moment } from 'moment';

export interface CoursesListItem {
  Id: number;
  Title: string;
  TopRated?: Boolean;
  CreationDate: Moment;
  Duration: string;
  Description: string;
}
