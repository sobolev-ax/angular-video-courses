import { Injectable } from '@angular/core';
import { CoursesListItem } from '../interfaces/courses-list-item';

import { COURSES } from './local-data';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses = [...COURSES];

  constructor() { }

  public getListCourses(): CoursesListItem[] {
    return this.courses;
  }

  public filterListCourses(courses, filter): CoursesListItem[] {
    if (filter !== undefined && filter !== '') {
      return courses
        .filter(({ Title }) => Title.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
    }
    return courses;
  }

  public createCourse(course: CoursesListItem): CoursesListItem[] {
    this.courses.push(course);

    return this.courses;
  }

  public getCourse(id: CoursesListItem['Id']): CoursesListItem {
    return this.courses.find(course => course.Id === id);
  }

  public updateCourse(
    newCourse: CoursesListItem
  ): CoursesListItem[] {
    const course = this.getCourse(newCourse.Id);

    course.Title = newCourse.Title;
    course.TopRated = newCourse.TopRated;
    course.CreationDate = newCourse.CreationDate;
    course.Duration = newCourse.Duration;
    course.Description = newCourse.Description;

    return this.courses;
  }

  public removeCourse(id: CoursesListItem['Id']): CoursesListItem[] {
    this.courses = this.courses.filter(course => course.Id !== id);
    return this.courses;
  }
}
