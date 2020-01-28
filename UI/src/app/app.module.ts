import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './components/search/search.component';
import { LoadingComponent } from './components/loading/loading.component';

import { RelevanceDirective } from './directives/relevance.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { ModalBoxComponent } from './components/modal-box/modal-box.component';

import { CoursesPageComponent } from './pages/courses/courses.page';
import { LoginPageComponent } from './pages/login/login.page';
import { EditPageComponent } from './pages/edit/edit.page';
import { NotfoundPageComponent } from './pages/notfound/notfound.page';

import { CoursesGuard } from './pages/courses/courses.guard';

import { CoursesService } from './services/courses.service';
import { AuthService } from './services/auth.service';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { CoursesEffects } from './store/effects/courses.effects';

const appRoutes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch:'full' },
  {
    path: 'courses',
    pathMatch:'full',
    component: CoursesPageComponent,
    canActivate: [CoursesGuard],
  },
  {
    path: 'new',
    component: EditPageComponent,
    canActivate: [CoursesGuard],
  },
  {
    path: 'courses/:id',
    pathMatch:'full',
    component: EditPageComponent,
    canActivate: [CoursesGuard],
  },
  { path: 'login', component: LoginPageComponent },
  {
    path: '**',
    component: NotfoundPageComponent,
  },
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
    LoadingComponent,
    RelevanceDirective,
    DurationPipe,
    ModalBoxComponent,
    CoursesPageComponent,
    LoginPageComponent,
    EditPageComponent,
    NotfoundPageComponent,
  ],
  exports: [
    CoursesListComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    SearchComponent,
    LoadingComponent,
    ModalBoxComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    StoreModule.forRoot(
      appReducers
    ),
    EffectsModule.forRoot([
      AuthEffects,
      CoursesEffects,
    ]),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    CoursesService,
    AuthService,
    CoursesGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
