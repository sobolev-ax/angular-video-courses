import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  @Input() course = '';

  @Output() searchCourse = new EventEmitter<String>();

  search(): void {
    this.searchCourse.emit(this.course);
  }
}
