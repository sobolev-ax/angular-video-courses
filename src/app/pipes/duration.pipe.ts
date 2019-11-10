import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: moment.Duration): string {
    const h = duration.hours() ? `${duration.hours()}h ` : '';
    const m = `${duration.minutes()}m`;
    return h + m;
  }

}
