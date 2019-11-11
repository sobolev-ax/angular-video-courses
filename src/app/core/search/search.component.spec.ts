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

  describe('search()', () => {
    it('should not clear value', () => {
      comp.course = 'course';

      comp.search();

      expect(comp.course).not.toEqual('');
    });
  });
});
