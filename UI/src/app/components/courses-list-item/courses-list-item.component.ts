import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CoursesListItem } from '../../interfaces/courses-list-item';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListItemComponent {

  @Input() item: CoursesListItem;

  @Output() deleteCourse = new EventEmitter<CoursesListItem['id']>();
  @Output() editCourse = new EventEmitter<CoursesListItem['id']>();

  delete(): void {
    this.deleteCourse.emit(this.item.id);
  }

  edit(): void {
    this.editCourse.emit(this.item.id);
  }
}
