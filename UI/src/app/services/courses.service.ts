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
  readonly route$: Subject<CoursesLoad> = new Subject();

  private courses = [];

  private isLocalCourses: boolean;

  private filter = '';

  private BASE_URL = 'http://localhost:3004';

  private start: number;
  private count: number;

  private coursesLoad: CoursesLoad = {
    Start: 0,
    Step: 5,
    Count: 10,
  };


  constructor(
    private http: HttpClient,
  ) { }


  public init(filter: string = '', isLocalCourses: boolean = false): void {
    this.filter = filter;
    this.isLocalCourses = isLocalCourses;

    this.updateCourses(true);
  }


  @withUpdateCourses
  public setFilter(filter: string): void {
    this.filter = filter;
  }


  @withUpdateCourses
  public addCourse(course: CoursesListItem): void {
    this.courses.unshift(course);
  }


  @withUpdateCourses
  public removeCourse(id: CoursesListItem['Id']): void {
    this.courses = this.courses.filter(course => course.Id !== id);
  }


  @withUpdateCourses
  public updateCourse(c: CoursesListItem): void {
    const course = this.getCourse(c.Id);

    course.Title = c.Title;
    course.TopRated = c.TopRated;
    course.CreationDate = c.CreationDate;
    course.Duration = c.Duration;
    course.Description = c.Description;
  }

  public getCourse(id: CoursesListItem['Id']): CoursesListItem {
    let course: CoursesListItem;

    if (true) {
      course = this.createCourseItem(this.http.get<CoursesListItem[]>(`${this.BASE_URL}/courses/2`));
    } else {
      course = this.courses.find(course => course.Id === id);
    }

    if (course === undefined) {
      throw new TypeError(`Cannot find course for this id: ${id}`);
    }

    return course;
  }


  private transformToListCourses(courses): CoursesListItem[] {
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
    return await new Promise((resolve, reject) => {
      if (this.isLocalCourses) {
        const courses = isFirstInit ? [...COURSES] : this.courses;

        setTimeout(() => resolve(courses), 750);
      } else {
        this.http.get<CoursesListItem[]>(`${this.BASE_URL}/courses`).subscribe((courses) => { // /courses?start=${0}&count=${1}
          resolve(this.transformToListCourses(courses));
        });
      }
    });
  }


  private getFilterListCourses(courses: CoursesListItem[]): CoursesListItem[] {
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
    originalMethod.apply(this, args);

    this.updateCourses();

    return this.courses$;
  };
}
