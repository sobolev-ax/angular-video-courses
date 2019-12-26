import * as moment from 'moment';

export interface CoursesListItem {
  Id: number;
  Title: string;
  TopRated?: boolean;
  CreationDate: moment.Moment;
  Duration: moment.Duration;
  Description: string;
}

class Course {
  constructor(name)
  constructor(name, id)
   {
      // type of course === string
       ///
      /// server
  }
}

new Course('course');

