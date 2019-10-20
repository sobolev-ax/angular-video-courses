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
      Description: ''
    },
    {
      Id: 1,
      Title: 'Video Course 2',
      CreationDate: '12 Nov, 2019',
      Duration: '1h 28min',
      Description: ''
    },
    {
      Id: 2,
      Title: 'Video Course 3',
      CreationDate: '20 Nov, 2019',
      Duration: '1h 28min',
      Description: ''
    },
    {
      Id: 3,
      Title: 'Video Course 4',
      CreationDate: '05 Dec, 2019',
      Duration: '1h 28min',
      Description: ''
    },
    {
      Id: 4,
      Title: 'Video Course 5',
      CreationDate: '09 Dec, 2019',
      Duration: '1h 28min',
      Description: ''
    },
  ];

  constructor() { }

  public getAllCourses(): CoursesListItem[] {
    return this.courses;
  }
}
