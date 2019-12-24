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
  @Output() logIn = new EventEmitter<IUser>();

  public duration: moment.Duration = moment.duration(100, 'minutes');

  public description: string;

  public title: string;

  public date: string;

  public authors: string;

  public crumbs: string[] = ['courses'];

  public durationMoment = moment;

  get elDuration() {
    return this.duration.asMinutes();
  }

  set elDuration(val) {
    this.duration = moment.duration(val, 'minutes');
  }

  private routeSubscription: Subscription;


  constructor(
    private activateRoute: ActivatedRoute,
    private coursesService: CoursesService,
  ) { }


  ngOnInit() {
    this.routeSubscription = this.activateRoute.params.subscribe(
      () => {
        this.crumbs[1] = this.title;
      }
    );
  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }


  enter(email: string, password: string): void {
    this.logIn.emit({ email, password });
  }
}
