import { Component, Input, OnInit } from '@angular/core';
import { CoursesListItem } from '../../interfaces/courses-list-item';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.sass']
})
export class CoursesListItemComponent implements OnInit {

  @Input() item: CoursesListItem;

  constructor() { }

  ngOnInit() {
  }

}
