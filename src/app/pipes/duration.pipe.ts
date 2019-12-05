import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: moment.Duration | string): string {
    let self: moment.Duration;

    if (typeof duration === 'number') {
      self = moment.duration(duration, 'minutes');
    } else {
      self = moment.duration(duration);
    }
    console.log(typeof duration);


    const h = self.hours() ? `${self.hours()}h ` : '';
    const m = `${self.minutes()}m`;
    return h + m;
  }

}
