import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoursesListItem } from '../interfaces/courses-list-item';
import { ServerCourse } from '../interfaces/server-course';

import { Subject, Subscription, Observable, of } from 'rxjs';
import * as moment from 'moment';
import { CoursesLoad } from '../interfaces/courses-load';
import { map, catchError } from 'rxjs/operators';

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

  public addCourse(course: CoursesListItem): Observable<ServerCourse> {
    const newCourse: ServerCourse = {
      name: course.title,
      date: String(course.creationDate.format('YYYY-MM-DD')),
      length: course.duration.asMinutes(),
      description: course.description,
      authors: {
        id: 0,
        name: 'Author'
      },
      isTopRated: false
    };

    return this.http.post<ServerCourse>(`${this.BASE_URL}/courses`, newCourse);
  }

  public removeCourse(id: CoursesListItem['id']): void {
    this.http.delete<ServerCourse>(`${this.BASE_URL}/courses/${id}`).subscribe(
    (data) => {
      console.log('Course deleted:', id);
      this.updateCourses();
    },
    (err) => {
      console.log('Can\'t delete course by id:', id);
    }
    );
  }

  public updateCourse(course: CoursesListItem): Observable<ServerCourse> {
    const updateCourse: ServerCourse = {
      id: course.id,
      name: course.title,
      date: String(course.creationDate.format('YYYY-MM-DD')),
      length: course.duration.asMinutes(),
      description: course.description,
      authors: {
        id: 0,
        name: 'Author'
      },
      isTopRated: course.isTopRated
    };

    return this.http.patch<ServerCourse>(`${this.BASE_URL}/courses/${course.id}`, updateCourse);
  }

  public getCourse(id: CoursesListItem['id']): Observable<CoursesListItem> {
    const gotError = (error: any): Observable<CoursesListItem> => {
      console.log('Not found course for this id:', id);
      return of({
        id: null,
        title: '',
        creationDate: moment(),
        duration: moment.duration(),
        description: ''
      });
    };

    return this.http.get<ServerCourse>(`${this.BASE_URL}/courses/${id}`).pipe(
      map(course => this.createCourseItem(course)),
      catchError(gotError),
    );
  }


  private transformToListCourses(courses): CoursesListItem[] {
    this.courses = courses.map(this.createCourseItem.bind(this));

    return this.courses;
  }


  private createCourseItem(item: ServerCourse): CoursesListItem {
    return {
      id: item.id,
      title: item.name,
      isTopRated: item.isTopRated,
      creationDate: moment(item.date),
      duration: moment.duration(item.length, 'minutes'),
      description: item.description,
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
      return courses.filter(({ title: title }) => title.toUpperCase().indexOf(this.filter.toUpperCase()) !== -1);
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
