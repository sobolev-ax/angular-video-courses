import { Component, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

import * as moment from 'moment';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.sass']
})
export class EditPageComponent {
  public duration: moment.Duration = moment.duration(100, 'minutes');
  public description: string;
  public title: string;
  public date: string;
  public authors: string;

  public durationMoment = moment;

  get elDuration() {
    return this.duration.asMinutes();
  }
  set elDuration(val) {
    this.duration = moment.duration(val, 'minutes');
  }

  @Output() logIn = new EventEmitter<IUser>();

  enter(email: string, password: string): void {
    this.logIn.emit({ email, password });
  }
}
