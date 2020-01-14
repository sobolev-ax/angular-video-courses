import { Action } from '@ngrx/store';

export enum ECommonActions {
  toLoadingOn = '[Common] Loading on',
  toLoadingOff = '[Common] Loading off',
}

export class LoadingOn implements Action {
  public readonly type = ECommonActions.toLoadingOn;
}

export class LoadingOff implements Action {
  public readonly type = ECommonActions.toLoadingOff;
}

export type CommonActions = LoadingOn | LoadingOff;
