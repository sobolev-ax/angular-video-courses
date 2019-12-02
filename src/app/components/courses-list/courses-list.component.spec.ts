import { CoursesListComponent } from './courses-list.component';
import { CoursesListItem } from '../../interfaces/courses-list-item';
import * as moment from 'moment';

describe('CoursesListComponent', () => {
  let comp: CoursesListComponent;

  const course: CoursesListItem = {
    Id: 0,
    Title: '',
    CreationDate: moment(),
    Duration: moment.duration(),
    Description: '',
  };

  beforeAll(() => {
    console.log = jasmine.createSpy('log');
  });

  beforeEach(() => {
    comp = new CoursesListComponent();

    comp.addCourse.emit = jasmine.createSpy('emit');
    comp.deleteCourse.emit = jasmine.createSpy('emit');
    comp.editCourse.emit = jasmine.createSpy('emit');
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('trackByFn() should return id', () => {
    let id: Number;
    const index = 0;

    id = comp.trackByFn(index, course);

    expect(id).toBe(course.Id);
  });

  it('add() should emit event', () => {
    comp.add(course);

    expect(comp.addCourse.emit).toHaveBeenCalledWith(course);
  });

  it('delete() should emit event', () => {
    comp.delete(course.Id);

    expect(comp.deleteCourse.emit).toHaveBeenCalledWith(course.Id);
  });

  it('edit() should emit event', () => {
    comp.edit(course.Id);

    expect(comp.editCourse.emit).toHaveBeenCalledWith(course.Id);
  });
});
