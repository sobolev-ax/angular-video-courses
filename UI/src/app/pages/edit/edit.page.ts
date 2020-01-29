import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CoursesListItem } from 'src/app/interfaces/courses-list-item';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  public id: number;
  public topRated: boolean;
  public authors = '';

  public crumbs: string[] = ['courses'];

  public form: FormGroup;

  private routeSubscription: Subscription;
  private courseSubscription: Subscription;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private store: Store<IAppState>,
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      date: new FormControl('2020-05-03', [Validators.required]),
      duration: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

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
    this.form.setValue({
      title: course.title,
      description: course.description,
      date: course.creationDate.format('YYYY-MM-DD'),
      duration: course.duration.asMinutes(),
    });
    this.authors = 'some authors';
  }

  public submit(): void {
    const course: CoursesListItem = {
      id: this.id || null,
      title: this.form.get('title').value,
      creationDate: moment(this.form.get('date').value),
      duration:  moment.duration(this.form.get('duration').value, 'minutes'),
      description: this.form.get('description').value,
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
