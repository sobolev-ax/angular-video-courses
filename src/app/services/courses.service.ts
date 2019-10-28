import { Injectable } from '@angular/core';
import { CoursesListItem } from '../interfaces/courses-list-item';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: CoursesListItem[] = [
    {
      Id: 0,
      Title: 'Video Course 1',
      CreationDate: '09 Nov, 2019',
      Duration: '1h 28min',
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 1,
      Title: 'Video Course 2',
      CreationDate: '12 Nov, 2019',
      Duration: '1h 28min',
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 2,
      Title: 'Video Course 3',
      CreationDate: '20 Nov, 2019',
      Duration: '1h 28min',
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 3,
      Title: 'Video Course 4',
      CreationDate: '05 Dec, 2019',
      Duration: '1h 28min',
      Description: 'Learn about where you can find course descriptions, what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions report information about a university or college\'s ' +
        'classes. They\'re published both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.'
    },
    {
      Id: 4,
      Title: 'Video Course 5',
      CreationDate: '09 Dec, 2019',
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
