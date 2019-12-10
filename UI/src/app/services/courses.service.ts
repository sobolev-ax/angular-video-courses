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

  private filter = '';


  @withUpdateCourses
  public init(filter: string = ''): void {
    console.log('CoursesService: init()');

    this.filter = filter;
  }

  @withUpdateCourses
  public setFilter(filter: string): void {
    console.log('CoursesService: setFilter()');

    this.filter = filter;
  }

  @withUpdateCourses
  public addCourse(course: CoursesListItem): void {
    console.log('CoursesService: addCourse()');

    this.courses.unshift(course);
  }

  @withUpdateCourses
  public removeCourse(id: CoursesListItem['Id']): void {
    console.log('CoursesService: removeCourse()');

    this.courses = this.courses.filter(course => course.Id !== id);
  }

  @withUpdateCourses
  public updateCourse(c: CoursesListItem): void {
    console.log('CoursesService: updateCourse()');

    const course = this.getCourse(c.Id);

    course.Title = c.Title;
    course.TopRated = c.TopRated;
    course.CreationDate = c.CreationDate;
    course.Duration = c.Duration;
    course.Description = c.Description;
  }

  public getCourse(id: CoursesListItem['Id']): CoursesListItem {
    console.log('CoursesService: getCourse()');

    const course: CoursesListItem = this.courses.find(course => course.Id === id);

    if (course === undefined) {
      throw new TypeError(`Cannot find course for this id: ${id}`);
    }

    return course;
  }


  private getListCourses(): CoursesListItem[] {
    console.log('CoursesService: getListCourses()');

    return this.courses;
  }

  private getFilterListCourses(): CoursesListItem[] {
    console.log('CoursesService: getFilterListCourses()');

    if (this.filter !== '') {
      return this.getListCourses()
        .filter(({ Title }) => Title.toUpperCase().indexOf(this.filter.toUpperCase()) !== -1);
    }

    return this.getListCourses();
  }
}

function withUpdateCourses(
  target: Object,
  method: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    console.log('CoursesService: withUpdateCourses()');

    originalMethod.apply(this, args);

    this.courses$.next(this.getFilterListCourses());

    return this.courses$;
  };
}
