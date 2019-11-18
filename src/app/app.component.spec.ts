import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoursesService } from './services/courses.service';

describe('AppComponent', () => {
  let fixture;
  let app;

  let isConfirmed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockHeaderComponent,
        MockBreadcrumbsComponent,
        MockSearchComponent,
        MockCoursesListComponent,
        MockFooterComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    window.confirm = jasmine.createSpy('confirm').and.callFake(() => isConfirmed);

    app.coursesService.courses$.subscribe = jasmine.createSpy('subscribe');
    app.coursesService.addCourse = jasmine.createSpy('addCourse');
    app.coursesService.updateCourse = jasmine.createSpy('updateCourse');
    app.coursesService.getFilterListCourses = jasmine.createSpy('getFilterListCourses');
    app.coursesService.removeCourse = jasmine.createSpy('removeCourse');

    isConfirmed = false;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('ngOnInit() should update courses', () => {
    app.ngOnInit();

    expect(app.coursesService.courses$.subscribe).toHaveBeenCalled();
  });

  it('searchCourse() should change filter name', () => {
    app.courseName = '';

    app.searchCourse('name');

    expect(app.courseName).toBe('name');
  });

  it('addCourse() should call service', () => {
    app.addCourse();

    expect(app.coursesService.addCourse).toHaveBeenCalled();
  });

  it('editCourse() should call service', () => {
    app.editCourse();

    expect(app.coursesService.updateCourse).toHaveBeenCalled();
  });

  it('deleteCourse() should nothing delete', () => {
    const id = 0;

    isConfirmed = false;
    app.deleteCourse(id);

    expect(app.coursesService.removeCourse).not.toHaveBeenCalled();
  });

  it('deleteCourse() should call service', () => {
    const id = 0;

    isConfirmed = true;
    app.deleteCourse(id);

    expect(app.coursesService.removeCourse).toHaveBeenCalledWith(id);
  });
});


@Component({
  selector: 'app-header',
  template: ''
})
class MockHeaderComponent {}

@Component({
  selector: 'app-breadcrumbs',
  template: ''
})
class MockBreadcrumbsComponent {}

@Component({
  selector: 'app-search',
  template: ''
})
class MockSearchComponent {}

@Component({
  selector: 'app-courses-list',
  template: ''
})
class MockCoursesListComponent {
  @Input() filter: String;
}

@Component({
  selector: 'app-footer',
  template: ''
})
class MockFooterComponent {}
