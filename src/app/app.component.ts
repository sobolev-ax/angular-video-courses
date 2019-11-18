import { Component, OnInit, OnChanges } from '@angular/core';
import { CoursesService } from './services/courses.service';
import { CoursesListItem } from './interfaces/courses-list-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnChanges {

  public courses: CoursesListItem[] = [];

  private courseName: CoursesListItem['Title'] = '';

  constructor(
    private coursesService: CoursesService,
  ) { }

  ngOnInit() {
    console.log('AppComponent: ngOnInit');
    this.updateCourses();
  }

  ngOnChanges() {
    console.log('AppComponent: ngOnChanges');
    this.updateCourses();
  }

  public searchCourse(title: CoursesListItem['Title']): void {
    console.log('AppComponent: searchCourse', title);
    this.courseName = title;
    this.updateCourses();
  }

  public addCourse(course: CoursesListItem): void {
    console.log('AppComponent: addCourse');
    this.updateCourses();
  }

  public deleteCourse(id: CoursesListItem['Id']): void {
    console.log('AppComponent: deleteCourse');
    this.courses = this.coursesService.removeCourse(id);
    this.updateCourses();
  }

  public editCourse(id: CoursesListItem['Id']): void {
    console.log('AppComponent: editCourse');
    this.updateCourses();
  }

  private updateCourses(): void {
    this.courses = this.coursesService.filterListCourses(
      this.coursesService.getListCourses(),
      this.courseName
    );
  }
}
