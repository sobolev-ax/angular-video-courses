import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, finalize, take } from 'rxjs/operators';
import { LoadingOn, LoadingOff } from '../actions/common.actions';
import { CoursesService } from '../../services/courses.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { ECoursesActions, CoursesRequest, CoursesSuccess } from '../actions/courses.actions';
import { CoursesParams } from 'src/app/interfaces/courses-params';
import { getCoursesParams } from '../selectors/courses.selector';
import { CoursesListItem } from 'src/app/interfaces/courses-list-item';

@Injectable()
export class CoursesEffects {

  constructor(
    private coursesService: CoursesService,
    private actions$: Actions,
    private store: Store<IAppState>,
  ) {}

  @Effect()
  userRequest$ = this.actions$.pipe(
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
}
