import { Component, OnInit } from '@angular/core';
import { CoursesService } from './services/courses.service';
import { AuthService } from './services/auth.service';
import { CoursesListItem } from './interfaces/courses-list-item';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public courses: CoursesListItem[] = [];

  private filter = '';

  public isAuthenticated: boolean;

  public isPageLogin: boolean;


  constructor(
    private coursesService: CoursesService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log('AppComponent.ngOnInit()');

    this.isPageLogin = false;
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.user$.subscribe(this.updateLogin.bind(this));

    this.coursesService.courses$.subscribe(this.updateCourses.bind(this));
    this.coursesService.init(this.filter);
  }


  public searchCourse(title: CoursesListItem['Title']): void {
    console.log('AppComponent.searchCourse()');

    this.filter = title;
    this.coursesService.setFilter(this.filter);
  }

  public addCourse(course: CoursesListItem): void {
    console.log('AppComponent.addCourse()');

    const newCourse: CoursesListItem = {
      Id: 100,
      Title: 'New Course',
      CreationDate: moment(),
      Duration: moment.duration(),
      Description: 'New description'
    };

    this.coursesService.addCourse(newCourse);
  }

  public deleteCourse(id: CoursesListItem['Id']): void {
    console.log('AppComponent.deleteCourse(), id:', id);

    const question = `Are you sure to delete this course?`;
    const confirmed = confirm(question);

    if (!confirmed) return;

    this.coursesService.removeCourse(id);
  }

  public editCourse(id: CoursesListItem['Id']): void {
    console.log('AppComponent.editCourse()');

    const course: CoursesListItem = {
      Id: 0,
      Title: 'Edited',
      CreationDate: moment(),
      Duration: moment.duration(),
      Description: 'New description'
    };

    this.coursesService.updateCourse(course);
  }

  public updateCourses(courses: CoursesListItem[]): void {
    console.log('AppComponent.updateCourses()');

    this.courses = [...courses];
  }

  public updateLogin(): void {
    console.log('AppComponent.updateLogin()');
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  public logIn(): void {
    console.log('AppComponent.logIn()');

    this.isPageLogin = true;
  }

  public logOf(): void {
    console.log('AppComponent.logOf()');

    this.isPageLogin = false;
  }
}
