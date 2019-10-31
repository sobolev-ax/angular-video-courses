import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let comp: SearchComponent;

  beforeEach(() => {
    comp = new SearchComponent();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should have ngOnInit method', () => {
    expect(comp.ngOnInit()).toBe(undefined);
  });

  it('should have empty course value', () => {
    expect(comp.course).toEqual('');
  });

  describe('findCourse()', () => {
    it('should clear value', () => {
      comp.course = 'course';

      comp.findCourse();

      expect(comp.course).toEqual('');
    });
    it('should ignore incorrect value', () => {
      comp.course = '   ';

      comp.findCourse();

      expect(comp.course).toEqual('   ');
    });
  });
});
