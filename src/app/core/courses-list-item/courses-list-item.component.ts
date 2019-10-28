import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoursesListItem } from '../../interfaces/courses-list-item';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.sass']
})
export class CoursesListItemComponent implements OnInit {

  @Input() item: CoursesListItem;

  @Output() deleteCourse = new EventEmitter<Number>();
  @Output() editCourse = new EventEmitter<Number>();

  constructor() { }

  ngOnInit() {
  }

  delete(): void {
    this.deleteCourse.emit(this.item.Id);
  }

  edit(): void {
    this.editCourse.emit(this.item.Id);
  }

}
