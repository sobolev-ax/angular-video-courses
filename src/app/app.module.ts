import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './components/search/search.component';

import { RelevanceDirective } from './directives/relevance.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { ModalBoxComponent } from './components/modal-box/modal-box.component';

import { CoursesPageComponent } from './pages/courses/courses.page';
import { LoginPageComponent } from './pages/login/login.page';

import { CoursesGuard } from './pages/courses/courses.guard';

import { CoursesService } from './services/courses.service';
import { AuthService } from './services/auth.service';
import { EditPageComponent } from './pages/edit/edit.page';

const appRoutes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch:'full' },
  { path: 'courses', component: CoursesPageComponent, canActivate: [CoursesGuard] },
  { path: 'edit', component: EditPageComponent },
  { path: 'login', component: LoginPageComponent },
];

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
    CoursesPageComponent,
    LoginPageComponent,
    EditPageComponent,
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
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    CoursesService,
    AuthService,
    CoursesGuard,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
