import { CoursesService } from './courses.service';
import { COURSES } from './local-data';
import { CoursesListItem } from '../interfaces/courses-list-item';
import * as moment from 'moment';

describe('CoursesService', () => {
  let service;

  const course: CoursesListItem = {
    Id: COURSES[COURSES.length - 1].Id + 1,
    Title: 'Title',
    CreationDate: moment(),
    Duration: moment.duration(),
    Description: '',
    TopRated: false,
  };

  beforeEach(() => {
    service = new CoursesService();
  });

  it('getListCourses() should return all courses', () => {
    const allCoursesLength = service.getListCourses().length;

    expect(allCoursesLength).toBe(COURSES.length);
  });

  it('removeCourse() should remove course', () => {
    const removeId = COURSES[0].Id;
    const newLength = service.removeCourse(removeId).length;
    const decreasedLength = COURSES.length - 1;

    expect(decreasedLength).toBe(newLength);
  });

  it('createCourse() should create course', () => {
    service.createCourse(course);

    const lastIndex = service.courses.length - 1;

    expect(service.courses[lastIndex]).toEqual(course);
  });

  it('getCourse() should return course by Id', () => {
    const course = service.getCourse(0);

    expect(service.courses[0]).toEqual(course);
  });

  it('filterListCourses() should return filtred courses', () => {
    const filtred = service.filterListCourses(service.courses, service.courses[0].Title);

    expect(filtred[0]).toEqual(service.courses[0]);
  });

  it('filterListCourses() should return all courses', () => {
    const filtred = service.filterListCourses(service.courses, '');

    expect(filtred.length).toEqual(service.courses.length);
  });

  it('updateCourse() should update all items in an course', () => {
    course.Id = 0;
    service.updateCourse(course);

    expect(service.courses[0].Title).toBe(course.Title);
  });
});





// it('ngOnChanges() should update courses', () => {
// 	comp.courses = [];

// 	comp.ngOnChanges();

// 	expect(comp.courses.length).toBe(5);
// });

// it('ngOnChanges() should filter courses', () => {
// 	comp.filter = service.getListCourses()[0].Title;

// 	comp.ngOnChanges();

// 	expect(comp.courses.length).toBe(1);
// 	expect(comp.courses[0].Title).toBe(comp.filter);
// });

// it('addCourse() should call console.log', () => {
// 	comp.addCourse();

// 	expect(console.log).toHaveBeenCalledWith('addCourse');
// });

// it('deleteCourse() should call console.log', () => {
// 	comp.deleteCourse(0);

// 	expect(console.log).toHaveBeenCalledWith('deleteCourse, id', 0);
// });

// it('editCourse() should call console.log', () => {
// 	comp.editCourse(0);

// 	expect(console.log).toHaveBeenCalledWith('editCourse, id', 0);
// });