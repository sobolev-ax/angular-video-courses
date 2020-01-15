import { Action } from '@ngrx/store';
import { CoursesListItem } from 'src/app/interfaces/courses-list-item';

export enum ECoursesActions {
  toCoursesRequest = '[Courses] Courses Request',
  toCoursesRequestMore = '[Courses] Courses Request More',
  toCoursesRequestDelete = '[Courses] Courses Request Delete',
  toCoursesSuccess = '[Courses] Courses Success',
  toCoursesSetFilter = '[Courses] Courses Filter',
}

export class CoursesRequest implements Action {
  public readonly type = ECoursesActions.toCoursesRequest;
}

export class CoursesRequestMore implements Action {
  public readonly type = ECoursesActions.toCoursesRequestMore;
}

export class CoursesRequestDelete implements Action {
  public readonly type = ECoursesActions.toCoursesRequestDelete;
  constructor(public payload: CoursesListItem['id']) {}
}

export class CoursesSuccess implements Action {
  public readonly type = ECoursesActions.toCoursesSuccess;
  constructor(public payload: CoursesListItem[]) {}
}

export class CoursesSetFilter implements Action {
  public readonly type = ECoursesActions.toCoursesSetFilter;
  constructor(public payload: string) {}
}

export type CoursesActions = CoursesRequest | CoursesSuccess | CoursesSetFilter | CoursesRequestMore | CoursesRequestDelete;
