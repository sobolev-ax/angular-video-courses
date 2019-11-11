import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Input } from '@angular/core';

describe('AppComponent', () => {
  let fixture;
  let app;

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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-video-courses'`, () => {
    expect(app.title).toEqual('angular-video-courses');
  });

  it(`search(name) should change courseName`, () => {
    app.courseName = '';

    app.search('name');

    expect(app.courseName).toEqual('name');
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
