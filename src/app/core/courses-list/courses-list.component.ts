import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { CoursesListItem } from '../../interfaces/courses-list-item';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass']
})
export class CoursesListComponent implements OnInit, OnChanges {

  public courses: CoursesListItem[] = [];

  @Input() filter: string;

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
    this.courses = this.filterCourses(
      this.coursesService.getAllCourses(),
      this.filter
    );
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

  private filterCourses(courses, filter): CoursesListItem[] {
    if (filter !== undefined && filter !== '') {
      return courses
        .filter(({ Title }) => Title.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
    }
    return courses;
  }

}
