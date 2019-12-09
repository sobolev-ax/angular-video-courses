import { Component, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

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

  public crumbs: string[] = ['courses'];

  public durationMoment = moment;

  constructor(
    private activateRoute: ActivatedRoute,
    private coursesService: CoursesService,
  ) {
    activateRoute.params.subscribe(
      params => this.crumbs[1] = coursesService.getCourse(Number(params['id'])).Title
    );
  }

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
