import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CoursesListItem } from '../../interfaces/courses-list-item';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent {

  @Input() courses: CoursesListItem[];
  @Input() isNext: boolean;

  @Output() addCourse = new EventEmitter<CoursesListItem>();
  @Output() deleteCourse = new EventEmitter<CoursesListItem['id']>();
  @Output() editCourse = new EventEmitter<CoursesListItem['id']>();
  @Output() getMoreCourses = new EventEmitter();

  trackByFn(index: Number, item: CoursesListItem): Number {
    return item.id;
  }

  add(): void {
    this.addCourse.emit();
  }

  delete(id: CoursesListItem['id']): void {
    this.deleteCourse.emit(id);
  }

  edit(id: CoursesListItem['id']): void {
    this.editCourse.emit(id);
  }

  more(): void {
    this.getMoreCourses.emit();
  }
}
