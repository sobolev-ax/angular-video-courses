import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.sass']
})
export class EditPageComponent implements OnInit, OnDestroy {
  public duration: moment.Duration = moment.duration(100, 'minutes');
  public description: string;
  public title: string;
  public date: string;
  public authors: string;

  public crumbs: string[] = ['courses'];

  public durationMoment = moment;

  private updateSubscription: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private coursesService: CoursesService,
  ) { }

  ngOnInit() {
    console.log('EditPageComponent.ngOnInit()');

    this.updateSubscription = this.activateRoute.params.subscribe(
      params => this.crumbs[1] = this.coursesService.getCourse(Number(params['id'])).Title
    );
  }

  ngOnDestroy() {
    console.log('EditPageComponent.ngOnDestroy()');

    this.updateSubscription.unsubscribe();
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
