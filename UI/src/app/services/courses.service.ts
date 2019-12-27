import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoursesListItem } from '../interfaces/courses-list-item';
import { ServerCourse } from '../interfaces/server-course';

import { Subject, Subscription, Observable, of, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { CoursesListState } from '../interfaces/courses-list-state';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private state: CoursesListState = {
    start: 0,
    count: 7,
    step: 10,
    sort: '',
    filter: '',
    textFragment: '',
    courses: []
  };

  readonly state$: Subject<CoursesListState> = new BehaviorSubject(this.state);

  private BASE_URL = 'http://localhost:3004';

  constructor(
    private http: HttpClient,
  ) { }

  public setState(state: CoursesListState): void {
    this.state = {
      ...state
    };
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
    return courses.map(this.createCourseItem.bind(this));
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

  private getListCourses(): Observable<CoursesListItem[]> {
    return this.http.get<ServerCourse[]>(`${this.BASE_URL}/courses`, {params: {
      start: String(this.state.start),
      count: String(this.state.count),
    }}).pipe(
      map(this.transformToListCourses.bind(this)),
    );
  }

  public updateCourses(): void {
    this.getListCourses().subscribe(
      courses => this.state$.next({
        ...this.state,
        courses
      })
    );
  }
}
