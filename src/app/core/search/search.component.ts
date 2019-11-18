import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  course = '';

  @Output() searchCourse = new EventEmitter<String>();

  search(): void {
    this.searchCourse.emit(this.course);
  }
}
