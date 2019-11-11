import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../../services/courses.service';

describe('CoursesListComponent', () => {
  let comp: CoursesListComponent;
  let service: CoursesService;

  beforeAll(() => {
    service = new CoursesService;

    console.log = jasmine.createSpy('log');
  });

  beforeEach(() => {
    comp = new CoursesListComponent(service);
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('ngOnInit() should get courses', () => {
    expect(comp.courses.length).toBe(0);

    comp.ngOnInit();

    expect(comp.courses.length).toBe(service.getAllCourses().length);
  });

  it('trackByFn() should return id', () => {
    let id: Number;
    const index = 0;
    const item = { id: 0 };

    id = comp.trackByFn(index, item);

    expect(id).toBe(item.id);
  });

  it('ngOnChanges() should update courses', () => {
    comp.courses = [];

    comp.ngOnChanges();

    expect(comp.courses.length).toBe(5);
  });

  it('ngOnChanges() should filter courses', () => {
    comp.filter = service.getAllCourses()[0].Title;

    comp.ngOnChanges();

    expect(comp.courses.length).toBe(1);
    expect(comp.courses[0].Title).toBe(comp.filter);
  });

  it('addCourse() should call console.log', () => {
    comp.addCourse();

    expect(console.log).toHaveBeenCalledWith('addCourse');
  });

  it('deleteCourse() should call console.log', () => {
    comp.deleteCourse(0);

    expect(console.log).toHaveBeenCalledWith('deleteCourse, id', 0);
  });

  it('editCourse() should call console.log', () => {
    comp.editCourse(0);

    expect(console.log).toHaveBeenCalledWith('editCourse, id', 0);
  });
});
