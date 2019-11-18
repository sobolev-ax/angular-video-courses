import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { RelevanceDirective } from './../directives/relevance.directive';
import { DurationPipe } from './../pipes/duration.pipe';
import { ModalBoxComponent } from './modal-box/modal-box.component';


@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    SearchComponent,
    RelevanceDirective,
    DurationPipe,
    ModalBoxComponent,
  ],
  exports: [
    CoursesListComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    SearchComponent,
    ModalBoxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CoreModule { }
