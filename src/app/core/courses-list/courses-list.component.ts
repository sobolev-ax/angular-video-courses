import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { CoursesListItem } from '../../interfaces/courses-list-item';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass']
})
export class CoursesListComponent implements OnInit {

  public courses: CoursesListItem[] = [];

  constructor(
    private coursesService: CoursesService,
  ) { }

  ngOnInit() {
    this.courses = this.coursesService.getAllCourses();
  }

}
