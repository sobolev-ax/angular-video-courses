import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, finalize, take } from 'rxjs/operators';
import { LoadingOn, LoadingOff } from '../actions/common.actions';
import { CoursesService } from '../../services/courses.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { ECoursesActions, CoursesRequest, CoursesSuccess, CoursesSetFilter, CoursesRequestMore, CoursesRequestDelete }
  from '../actions/courses.actions';
import { CoursesParams } from 'src/app/interfaces/courses-params';
import { getCoursesParams } from '../selectors/courses.selector';
import { CoursesListItem } from 'src/app/interfaces/courses-list-item';
import { of } from 'rxjs';

@Injectable()
export class CoursesEffects {

  constructor(
    private coursesService: CoursesService,
    private actions$: Actions,
    private store: Store<IAppState>,
  ) {}

  @Effect()
  coursesRequest$ = this.actions$.pipe(
    ofType<CoursesRequest>(ECoursesActions.toCoursesRequest),
    switchMap(() => {
      let params: CoursesParams;

      this.store.dispatch(new LoadingOn());

      this.store.pipe(select(getCoursesParams), take(1)).subscribe(data => params = { ...data });

      return this.coursesService
        .rxGetListCourses(params)
        .pipe(
          map((courses: CoursesListItem[]) => {
            return new CoursesSuccess(courses);
          }),
          finalize(() => this.store.dispatch(new LoadingOff())),
        );
    })
  );

  @Effect()
  coursesRequestMore$ = this.actions$.pipe(
    ofType<CoursesRequestMore>(ECoursesActions.toCoursesRequestMore),
    switchMap(() => {
      this.store.dispatch(new CoursesRequest());

      return of();
    })
  );

  @Effect()
  coursesRequestDelete$ = this.actions$.pipe(
    ofType<CoursesRequestDelete>(ECoursesActions.toCoursesRequestDelete),
    switchMap((action) => {
      return this.coursesService
        .rxRemoveCourse(action.payload)
        .pipe(
          map(() => {
            return new CoursesRequest();
          })
        );
    })
  );

  @Effect()
  coursesSetFilter$ = this.actions$.pipe(
    ofType<CoursesSetFilter>(ECoursesActions.toCoursesSetFilter),
    switchMap(() => {
      this.store.dispatch(new CoursesRequest());

      return of();
    })
  );
}
