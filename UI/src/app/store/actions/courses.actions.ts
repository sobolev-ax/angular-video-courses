import { Action } from '@ngrx/store';
import { CoursesListItem } from 'src/app/interfaces/courses-list-item';

export enum ECoursesActions {
  toCoursesRequest = '[Courses] Courses Request',
  toCoursesSuccess = '[Courses] Courses Success',
}

export class CoursesRequest implements Action {
  public readonly type = ECoursesActions.toCoursesRequest;
}

export class CoursesSuccess implements Action {
  public readonly type = ECoursesActions.toCoursesSuccess;
  constructor(public payload: CoursesListItem[]) {}
}

export type CoursesActions = CoursesRequest | CoursesSuccess;
