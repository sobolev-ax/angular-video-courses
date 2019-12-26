import * as moment from 'moment';

export interface CoursesListItem {
  id: number;
  title: string;
  isTopRated?: boolean;
  creationDate: moment.Moment;
  duration: moment.Duration;
  description: string;
}
