import { DurationPipe } from './duration.pipe';
import * as moment from 'moment';

describe('DurationPipe', () => {
  let pipe;
  let transform;

  beforeAll(() => {
    pipe = new DurationPipe();
    transform = pipe.transform;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return full duration', () => {
    expect(transform(moment.duration('12:59'))).toContain('12', '59');
  });

  it('should return minutes', () => {
    expect(transform(moment.duration('00:59'))).not.toContain('0');
    expect(transform(moment.duration('00:59'))).toContain('59');
  });
});
