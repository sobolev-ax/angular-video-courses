import { Injectable } from '@angular/core';
import { CoursesListItem } from '../interfaces/courses-list-item';
import { IDates } from '../interfaces/dates';

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

  private courses: CoursesListItem[] = [
    {
      Id: 0,
      Title: 'Video Course 1',
      CreationDate: this.dt.nextDate,
      Duration: '1h 28min',
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 1,
      Title: 'Video Course 2',
      CreationDate: this.dt.today,
      Duration: '1h 28min',
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 2,
      Title: 'Video Course 3',
      CreationDate: this.dt.prevDate,
      Duration: '1h 28min',
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 3,
      Title: 'Video Course 4',
      CreationDate: this.dt.prevOneWeeks,
      Duration: '1h 28min',
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 4,
      Title: 'Video Course 5',
      CreationDate: this.dt.prevTwoWeeks,
      Duration: '1h 28min',
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
