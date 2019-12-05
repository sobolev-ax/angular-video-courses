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

  @Output() addCourse = new EventEmitter<CoursesListItem>();
  @Output() deleteCourse = new EventEmitter<CoursesListItem['Id']>();
  @Output() editCourse = new EventEmitter<CoursesListItem['Id']>();

  trackByFn(index: Number, item: CoursesListItem): Number {
    return item.Id;
  }

  add(): void {
    this.addCourse.emit();
  }

  delete(id: CoursesListItem['Id']): void {
    this.deleteCourse.emit(id);
  }

  edit(id: CoursesListItem['Id']): void {
    this.editCourse.emit(id);
  }
}
