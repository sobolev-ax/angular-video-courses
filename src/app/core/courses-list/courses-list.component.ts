import { Component, OnChanges, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { CoursesListItem } from '../../interfaces/courses-list-item';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass']
})
export class CoursesListComponent implements OnInit, OnChanges {

  public courses: CoursesListItem[] = [];

  constructor(
    private coursesService: CoursesService,
  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.courses = this.coursesService.getAllCourses();
  }

  trackByFn(index, item): Number {
    return item.id;
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  addCourse(): void {
    console.log('addCourse');
  }

  deleteCourse(id: Number): void {
    console.log('deleteCourse, id', id);
  }

  editCourse(id: Number): void {
    console.log('editCourse, id', id);
  }

}
