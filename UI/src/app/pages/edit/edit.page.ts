import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CoursesListItem } from 'src/app/interfaces/courses-list-item';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { SelectCourseRequest, UpdateCourseRequest } from 'src/app/store/actions/courses.actions';
import { getSelectedCourse } from 'src/app/store/selectors/courses.selector';

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
  private courseSubscription: Subscription;


  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private store: Store<IAppState>,
  ) { }


  ngOnInit() {
    this.routeSubscription = this.activateRoute.params.subscribe(
      (params) => {
        if (params.id === undefined) {
          this.crumbs.push('new course');
          return;
        }

        this.courseSubscription = this.store.pipe(select(getSelectedCourse)).subscribe((course) => {
          if (!course) return;

          this.toFillPage(course);
        });

        this.store.dispatch(new SelectCourseRequest(params.id));
      }
    );
  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.courseSubscription) this.courseSubscription.unsubscribe();
  }

  private toFillPage(course: CoursesListItem): void {
    if (course.id === null) {
      this.crumbs.push('new course');
      return;
    }

    console.log('Got course by id:', course.id);

    this.crumbs.push(course.title);

    this.id = course.id;
    this.topRated = course.isTopRated;
    this.description = course.description;
    this.title = course.title;
    this.date = course.creationDate.format('YYYY-MM-DD');
    this.elDuration = course.duration.asMinutes();
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
      id: this.id || null,
      title: this.title,
      creationDate: moment(this.date),
      duration: this.duration,
      description: this.description,
    };

    if (this.id) {
      this.store.dispatch(new UpdateCourseRequest(course));
      this.router.navigate(['']);
    } else {
      this.coursesService.addCourse(course).subscribe(
        () => {
          console.log('Added new course:', course.title);
          this.router.navigate(['']);
        },
        err => console.log('Can\'t add new course:', err)
      );
    }
  }
}
