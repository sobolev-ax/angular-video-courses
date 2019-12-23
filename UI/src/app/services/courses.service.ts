import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoursesListItem } from '../interfaces/courses-list-item';

import { COURSES } from './local-data';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { CoursesLoad } from '../interfaces/courses-load';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  readonly courses$: Subject<CoursesListItem[]> = new Subject();

  private courses = [];

  private isLocalCourses: boolean;

  private filter = '';

  private BASE_URL = 'http://localhost:3004';

  private start: number;
  private count: number;

  private CoursesLoad: CoursesLoad = {
    Start: 0,
    Step: 5,
    Count: 0,
  };


  constructor(
    private http: HttpClient,
  ) { }


  public init(filter: string = '', isLocalCourses: boolean = false): void {
    console.log('CoursesService: init()');

    this.filter = filter;
    this.isLocalCourses = isLocalCourses;

    this.updateCourses(true);
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


  private transformToListCourses(courses): CoursesListItem[] {
    console.log('CoursesService: transformToListCourses()');

    this.courses = courses.map(this.createCourseItem.bind(this));

    return this.courses;
  }


  private createCourseItem(item): CoursesListItem {
    return {
      Id: item.id,
      Title: item.name,
      TopRated: item.isTopRated,
      CreationDate: moment(item.date),
      Duration: moment.duration(item.length, 'minutes'),
      Description: item.description,
    };
  }


  private async getListCourses(isFirstInit: boolean = false): Promise<CoursesListItem[]> {
    console.log('CoursesService: getListCourses()');

    return await new Promise((resolve, reject) => {
      if (this.isLocalCourses) {
        const courses = isFirstInit ? [...COURSES] : this.courses;

        setTimeout(() => resolve(courses), 750);
      } else {
        this.http.get<CoursesListItem[]>(`${this.BASE_URL}/courses`).subscribe((courses) => {
          resolve(this.transformToListCourses(courses));
        });
      }
    });
  }


  private getFilterListCourses(courses: CoursesListItem[]): CoursesListItem[] {
    console.log('CoursesService: getFilterListCourses()');

    if (this.filter !== '') {
      return courses.filter(({ Title }) => Title.toUpperCase().indexOf(this.filter.toUpperCase()) !== -1);
    }

    return courses;
  }


  private updateCourses(isFirstInit: boolean = false): void {
    this.getListCourses(isFirstInit)
      .then((courses) => {
        this.courses = courses;
        this.courses$.next(this.getFilterListCourses(courses));
      });
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

    this.updateCourses();

    return this.courses$;
  };
}
