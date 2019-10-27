import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CoursesListComponent, CoursesListItemComponent, HeaderComponent, FooterComponent, BreadcrumbsComponent, SearchComponent],
  exports: [
    CoursesListComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CoreModule { }
