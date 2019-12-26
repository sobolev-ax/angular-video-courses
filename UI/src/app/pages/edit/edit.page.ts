import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CoursesListItem } from 'src/app/interfaces/courses-list-item';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.sass']
})
export class EditPageComponent implements OnInit, OnDestroy {
  public duration: moment.Duration = moment.duration(30, 'minutes');

  get elDuration() {
    return this.duration.asMinutes();
  }

  set elDuration(val) {
    this.duration = moment.duration(val, 'minutes');
  }

  public id: number;

  public topRated: boolean;

  public description = '';

  public title = '';

  public date = '';

  public authors = '';

  public crumbs: string[] = ['courses'];

  private routeSubscription: Subscription;
  private serviceSubscription: Subscription;


  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private coursesService: CoursesService,
  ) { }


  ngOnInit() {
    this.routeSubscription = this.activateRoute.params.subscribe(
      (params) => {
        if (params.id === undefined) {
          this.crumbs.push('new course');
          return;
        }

        this.serviceSubscription = this.coursesService.getCourse(params.id).subscribe(
            this.toFillPage.bind(this)
        );
      }
    );
  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.serviceSubscription) this.serviceSubscription.unsubscribe();
  }

  private toFillPage(course: CoursesListItem): void {
    if (course.Id === null) {
      this.crumbs.push('new course');
      return;
    }

    console.log('Got course by id:', course.Id);

    this.crumbs.push(course.Title);

    this.id = course.Id;
    this.topRated = course.TopRated;
    this.description = course.Description;
    this.title = course.Title;
    this.date = course.CreationDate.format('YYYY-MM-DD');
    this.elDuration = course.Duration.asMinutes();
    this.authors = 'some authors';
  }

  public submit(): void {
    if (
         this.description === ''
      || this.title === ''
      || this.date === ''
      || this.elDuration === 0
    ) {
      console.log('Check all fields ------');
      console.log(`title: ${this.title === '' ? 'Empty!' : this.title}`);
      console.log(`description: ${this.description === '' ? 'Empty!' : this.description}`);
      console.log(`date: ${this.date === '' ? 'Empty!' : this.date}`);
      console.log(`duration: ${this.elDuration === 0 ? 'Empty!' : this.elDuration}`);

      return;
    }

    const course: CoursesListItem = {
      Id: this.id || null,
      Title: this.title,
      CreationDate: moment(this.date),
      Duration: this.duration,
      Description: this.description,
    };

    if (this.id) {
      this.coursesService.updateCourse(course).subscribe(
        () => {
          console.log('Edited course:', course.Id);
          this.router.navigate(['']);
        },
        err => console.log('Can\'t edit:', err)
      );

    } else {
      this.coursesService.addCourse(course).subscribe(
        () => {
          console.log('Added new course:', course.Title);
          this.router.navigate(['']);
        },
        err => console.log('Can\'t add new course:', err)
      );
    }
  }
}
