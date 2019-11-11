import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  course = '';

  @Output() searchCourse = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  search(): void {
    console.log('search, output:', this.course);

    this.searchCourse.emit(this.course);
  }

}
