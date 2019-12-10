import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})
export class BreadcrumbsComponent {
  @Input() crumbs: string[];

  trackByFn(index: Number, item: string): String {
    return item;
  }
}
