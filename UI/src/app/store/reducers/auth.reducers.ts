import { AuthActions, EAuthActions } from '../actions/auth.actions';
import { IAuthState, initialAuthState } from '../state/auth.state';

export const authReducer = (
  state = initialAuthState,
  acttion: AuthActions
): IAuthState => {
  console.log('authReducer', acttion.type);
  switch (acttion.type) {
    case EAuthActions.toLogRequest: {
      console.log('toLogRequest', acttion);
      return {
        ...state
      };
    }
    case EAuthActions.toLogSuccess: {
      console.log('toLogSuccess', acttion);
      return {
        ...state,
        token: acttion.payload
      };
    }
    case EAuthActions.toLogFailed: {
      console.log('toLogFailed', acttion);
      return {
        ...state
      };
    }
    default:
      return state;
  }
};
