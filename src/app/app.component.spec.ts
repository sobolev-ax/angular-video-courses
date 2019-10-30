import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-video-courses'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-video-courses');
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
class MockCoursesListComponent {}

@Component({
  selector: 'app-footer',
  template: ''
})
class MockFooterComponent {}
