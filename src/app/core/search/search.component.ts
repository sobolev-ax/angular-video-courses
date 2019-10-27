import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  course = '';

  constructor() { }

  ngOnInit() {
  }

  findCourse(): void {
    if (!this.course.trim()) return;

    console.log('findCourse:', this.course);

    this.course = '';
  }

}
