import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let comp: SearchComponent;

  beforeEach(() => {
    comp = new SearchComponent();

    comp.searchCourse.emit = jasmine.createSpy('emit');
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should have empty course value', () => {
    expect(comp.course).toEqual('');
  });

  describe('search()', () => {
    it('should not clear value', () => {
      comp.course = 'course';

      comp.search();

      expect(comp.course).not.toEqual('');
    });

    it('should emit event', () => {
      comp.course = 'course';

      comp.search();

      expect(comp.searchCourse.emit).toHaveBeenCalledWith(comp.course);
    });
  });
});
