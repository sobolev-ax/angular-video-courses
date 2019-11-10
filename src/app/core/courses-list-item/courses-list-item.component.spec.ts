import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListItemComponent } from './courses-list-item.component';
import { CoursesListItem } from '../../interfaces/courses-list-item';
import { DurationPipe } from '../../pipes/duration.pipe';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment  from 'moment';

describe('CoursesListItemComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let editBtnEl: HTMLElement;
  let deleBtnEl: HTMLElement;

  const pipe = new DatePipe('en');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListItemComponent, TestHostComponent, DurationPipe],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture  = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;

    editBtnEl = fixture.nativeElement.querySelector('#item-control-el-edit');
    deleBtnEl = fixture.nativeElement.querySelector('#item-control-el-delete');

    fixture.detectChanges();
  });

  it('should display full information of course', () => {
    const main: HTMLElement = fixture.nativeElement.querySelector('.item-main');
    const duration = (new DurationPipe).transform(mockCourse.Duration);

    expect(main.textContent).toContain(mockCourse.Title.toUpperCase());
    expect(main.textContent).toContain(pipe.transform(mockCourse.CreationDate, 'd LLL, yyyy'));
    expect(main.textContent).toContain(duration);
    expect(main.textContent).toContain(mockCourse.Description);

    expect(Object.keys(mockCourse).length).toBe(5);
  });

  it('should raise editCourse event when clicked', () => {
    editBtnEl.click();
    expect(testHost.editedCourse).toBe(mockCourse.Id);
  });

  it('should raise deleteCourse event when clicked', () => {
    deleBtnEl.click();
    expect(testHost.deletedCourse).toBe(mockCourse.Id);
  });
});

const mockCourse: CoursesListItem = {
  Id: 0,
  Title: 'Title',
  CreationDate: moment(),
  Duration: moment.duration(),
  Description: 'Description'
};

@Component({
  template: `
    <app-courses-list-item
      [item]="course"
      (deleteCourse)="deleteCourse($event)"
      (editCourse)="editCourse($event)"
    ></app-courses-list-item>`
})
class TestHostComponent {
  course: CoursesListItem = mockCourse;

  editedCourse: Number;
  deletedCourse: Number;

  editCourse(id: Number) { this.editedCourse = id; }
  deleteCourse(id: Number) { this.deletedCourse = id; }
}
