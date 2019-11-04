import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListItemComponent } from './courses-list-item.component';
import { CoursesListItem } from '../../interfaces/courses-list-item';
import { By } from '@angular/platform-browser';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;
  let mockItem: CoursesListItem;

  const el = {
    debug: {
      desc: null,
      delete: null,
      edit: null,
    },
    native: {
      desc: null,
      delete: null,
      edit: null,
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListItemComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;

    // find the DebugElement and element
    el.debug.desc = fixture.debugElement.query(By.css('.item-main-description'));
    el.native.desc = el.debug.desc.nativeElement;
    el.debug.edit = fixture.debugElement.query(By.css('#item-control-el-edit'));
    el.native.edit = el.debug.edit.nativeElement;
    el.debug.delete = fixture.debugElement.query(By.css('#item-control-el-delete'));
    el.native.delete = el.debug.delete.nativeElement;

    // mock the course supplied by the parent component
    mockItem = {
      Id: 0,
      Title: 'mock-title',
      CreationDate: 'mock-date',
      Duration: 'mock-duration',
      Description: 'mock-description',
    };

    // simulate the parent setting the input property
    component.item = mockItem;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display description in uppercase', () => {
    const expectedPipedName = mockItem.Description.toUpperCase();
    mockItem.Description = expectedPipedName;

    fixture.detectChanges();

    expect(el.native.desc.textContent).toContain(expectedPipedName);
  });

  it('should raise editCourse event when clicked (triggerEventHandler)', () => {
    let selectedId: Number;

    component.editCourse.subscribe((id: Number) => selectedId = id);
    el.debug.edit.triggerEventHandler('click', null);

    expect(selectedId).toBe(mockItem.Id);
  });

  it('should raise deleteCourse event when clicked (triggerEventHandler)', () => {
    let selectedId: Number;

    component.deleteCourse.subscribe((id: Number) => selectedId = id);
    el.debug.delete.triggerEventHandler('click', null);

    expect(selectedId).toBe(mockItem.Id);
  });
});
