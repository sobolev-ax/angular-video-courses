import { Injectable } from '@angular/core';
import { CoursesListItem } from '../interfaces/courses-list-item';
import { IDates } from '../interfaces/dates';
import { IDurations } from '../interfaces/durations';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private today: moment.Moment = moment();
  private dt: IDates = {
    nextDate: moment(this.today).add(1, 'days'),
    today: this.today,
    prevDate: moment(this.today).subtract(1, 'days'),
    prevOneWeeks: moment(this.today).subtract(1, 'weeks'),
    prevTwoWeeks: moment(this.today).subtract(2, 'weeks'),
  };

  private durations: IDurations = {
    normal: moment.duration('01:28'),
    short: moment.duration('00:25'),
    long: moment.duration('23:00'),
  };

  private courses: CoursesListItem[] = [
    {
      Id: 0,
      Title: 'Introduction to the Angular Docs',
      CreationDate: this.dt.nextDate,
      Duration: this.durations.normal,
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 1,
      Title: 'Tour of Heroes App and Tutorial',
      CreationDate: this.dt.today,
      Duration: this.durations.short,
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 2,
      Title: 'Architecture overview',
      TopRated: true,
      CreationDate: this.dt.prevDate,
      Duration: this.durations.long,
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 3,
      Title: 'Security',
      CreationDate: this.dt.prevOneWeeks,
      Duration: this.durations.normal,
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 4,
      Title: 'Workspace and project file structure',
      TopRated: true,
      CreationDate: this.dt.prevTwoWeeks,
      Duration: this.durations.normal,
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
  ];

  constructor() { }

  public getAllCourses(): CoursesListItem[] {
    return this.courses;
  }
}
