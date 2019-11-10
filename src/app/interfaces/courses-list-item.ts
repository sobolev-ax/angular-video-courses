import * as moment from 'moment';

export interface CoursesListItem {
  Id: number;
  Title: string;
  TopRated?: Boolean;
  CreationDate: moment.Moment;
  Duration: moment.Duration;
  Description: string;
}
