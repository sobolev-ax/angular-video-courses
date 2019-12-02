import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './components/search/search.component';

import { RelevanceDirective } from './directives/relevance.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { ModalBoxComponent } from './components/modal-box/modal-box.component';


@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
