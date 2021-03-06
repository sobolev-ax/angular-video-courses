import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CoursesListItem } from '../interfaces/courses-list-item';
import { ServerCourse } from '../interfaces/server-course';

import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { CoursesListState } from '../interfaces/courses-list-state';
import { map, catchError, tap, finalize, throttleTime, delay } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { CoursesParams } from '../interfaces/courses-params';

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
    courses: [],
    next: true,
  };

  readonly state$: Subject<CoursesListState> = new BehaviorSubject(this.state);

  private BASE_URL = 'http://localhost:3004';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) { }

  public setState(state: CoursesListState): void {
    this.state = {
      start: state.start,
      count: state.count,
      step: state.step,
      sort: state.sort,
      filter: state.filter,
      textFragment: state.textFragment,
      courses: [...state.courses],
      next: state.next,
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
      this.getListCourses();
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

  public rxGetListCourses(params: CoursesParams): Observable<CoursesListItem[]> {
    return this.http.get<ServerCourse[]>(`${this.BASE_URL}/courses`, { params: { ...params } }).pipe(
      delay(550),
      map(this.transformToListCourses.bind(this)),
    );
  }

  public rxRemoveCourse(id: CoursesListItem['id']): Observable<any> {
    return this.http.delete<ServerCourse>(`${this.BASE_URL}/courses/${id}`).pipe(
      delay(300)
    );
  }

  public rxGetCourse(id: CoursesListItem['id']): Observable<any> {
    return this.http.get<ServerCourse>(`${this.BASE_URL}/courses/${id}`).pipe(
      map(course => this.createCourseItem(course)),
    );
  }

  public rxUpdateCourse(course: CoursesListItem): Observable<ServerCourse> {
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

  public getListCourses(): void {
    const params = {
      start: String(this.state.start),
      count: String(this.state.count),
      textFragment: this.state.textFragment
    };

    console.log(`Courses request:
      start - ${params.start},
      count - ${params.count},
      step - ${this.state.step},
      textFragment - ${this.state.textFragment}`);

    const gotCourses = (couses): void => {
      console.log(`Courses got: ${couses.length}`);
    };

    this.loadingService.setLoading(true);

    this.http.get<ServerCourse[]>(`${this.BASE_URL}/courses`, { params }).pipe(
      delay(500),
      tap(gotCourses),
      map(this.transformToListCourses.bind(this)),
    ).subscribe((courses: CoursesListItem[]) => {

      if (courses.length < this.state.count) {
        this.state.next = false;
      }

      this.state = {
        ...this.state,
        courses: [...courses]
      };

      this.sendUpdate();

      this.loadingService.setLoading(false);
    });
  }

  public getNextListCourses(): void {
    this.state = {
      ...this.state,
      count: this.state.count + this.state.step,
    };

    this.getListCourses();
  }

  public getTextFragmentListCourses(text: string): void {
    this.state = {
      ...this.state,
      next: true,
      textFragment: text.trim(),
    };

    if (text.length < 3 && text.length !== 0) return;

    this.getListCourses();
  }

  public sendUpdate(): void {
    this.state$.next({
      ...this.state
    });
  }
}
