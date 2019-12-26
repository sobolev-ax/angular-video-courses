import { CoursesListItem } from '../interfaces/courses-list-item';
import { IDates } from '../interfaces/dates';
import { IDurations } from '../interfaces/durations';
import { IUser } from '../interfaces/user';

import * as moment from 'moment';

const today: moment.Moment = moment();

const dt: IDates = {
  today,
  nextDate: moment(today).add(1, 'days'),
  prevDate: moment(today).subtract(1, 'days'),
  prevOneWeeks: moment(today).subtract(1, 'weeks'),
  prevTwoWeeks: moment(today).subtract(2, 'weeks'),
};

const durations: IDurations = {
  normal: moment.duration('01:28'),
  short: moment.duration('00:25'),
  long: moment.duration('23:00'),
};

const COURSES: CoursesListItem[] = [
  {
    id: 0,
    title: 'Introduction to the Angular Docs',
    creationDate: dt.nextDate,
    duration: durations.normal,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
      'about various components of a course description. Course descriptions report information about a university or college\'s ' +
      'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
      'descriptions for all courses offered during a particular semester.'
  },
  {
    id: 1,
    title: 'Tour of Heroes App and Tutorial',
    creationDate: dt.today,
    duration: durations.short,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
      'about various components of a course description. Course descriptions report information about a university or college\'s ' +
      'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
      'descriptions for all courses offered during a particular semester.'
  },
  {
    id: 2,
    title: 'Architecture overview',
    isTopRated: true,
    creationDate: dt.prevDate,
    duration: durations.long,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
      'about various components of a course description. Course descriptions report information about a university or college\'s ' +
      'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
      'descriptions for all courses offered during a particular semester.'
  },
  {
    id: 3,
    title: 'Security',
    creationDate: dt.prevOneWeeks,
    duration: durations.normal,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
      'about various components of a course description. Course descriptions report information about a university or college\'s ' +
      'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
      'descriptions for all courses offered during a particular semester.'
  },
  {
    id: 4,
    title: 'Workspace and project file structure',
    isTopRated: true,
    creationDate: dt.prevTwoWeeks,
    duration: durations.normal,
    description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
      'about various components of a course description. Course descriptions report information about a university or college\'s ' +
      'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
      'descriptions for all courses offered during a particular semester.'
  },
];

const USERS: IUser[] = [
  {
    email: 'admin',
    password: 'admin',
  },
  {
    email: 'user',
    password: 'user',
  },
];

export { COURSES };
export { USERS };
