import { createReducer, on } from '@ngrx/store';
import { AuthActions, EAuthActions } from '../actions/auth.actions';
import { IAuthState, initialAuthState } from '../state/auth.state';

export const authReducer = (
  state = initialAuthState,
  acttion: AuthActions
): IAuthState => {
  console.log('authReducer', acttion.type);
  switch (acttion.type) {
    case EAuthActions.toLogRequest: {
      console.log('toLogRequest');
      return {
        ...state
      };
    }
    case EAuthActions.toLogSuccess: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};
