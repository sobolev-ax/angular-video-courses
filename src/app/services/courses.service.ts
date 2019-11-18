import { Injectable } from '@angular/core';
import { CoursesListItem } from '../interfaces/courses-list-item';

import { COURSES } from './local-data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  readonly courses$: Subject<CoursesListItem[]> = new Subject();

  private courses = [...COURSES];

  constructor() { }

  public getListCourses(): CoursesListItem[] {
    return this.courses;
  }

  public getFilterListCourses(filter): CoursesListItem[] {
    if (filter !== undefined && filter !== '') {
      return this.getListCourses()
        .filter(({ Title }) => Title.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
    }
    return this.getListCourses();
  }

  public addCourse(course: CoursesListItem): void {
    this.courses.unshift(course);
    this.courses$.next();
  }

  public getCourse(id: CoursesListItem['Id']): CoursesListItem {
    return this.courses.find(course => course.Id === id);
  }

  public updateCourse(newCourse: CoursesListItem): void {
    const course = this.getCourse(newCourse.Id);

    course.Title = newCourse.Title;
    course.TopRated = newCourse.TopRated;
    course.CreationDate = newCourse.CreationDate;
    course.Duration = newCourse.Duration;
    course.Description = newCourse.Description;

    this.courses$.next();
  }

  public removeCourse(id: CoursesListItem['Id']): void {
    this.courses = this.courses.filter(course => course.Id !== id);
    this.courses$.next();
  }
}
