import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CoursesListItem } from '../../interfaces/courses-list-item';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass']
})
export class CoursesListComponent {

  @Input() courses: CoursesListItem[];

  @Output() addCourse = new EventEmitter<CoursesListItem>();
  @Output() deleteCourse = new EventEmitter<CoursesListItem['Id']>();
  @Output() editCourse = new EventEmitter<CoursesListItem['Id']>();

  trackByFn(index: Number, item: CoursesListItem): Number {
    return item.Id;
  }

  add(course: CoursesListItem): void {
    this.addCourse.emit(course);
  }

  delete(id: CoursesListItem['Id']): void {
    this.deleteCourse.emit(id);
  }

  edit(id: CoursesListItem['Id']): void {
    this.editCourse.emit(id);
  }
}
