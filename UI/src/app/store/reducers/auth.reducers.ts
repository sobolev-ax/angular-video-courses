import { AuthActions, EAuthActions } from '../actions/auth.actions';
import { initialAuthState } from '../state/auth.state';
import { IAuthState } from 'src/app/interfaces/auth-state';

export const authReducer = (
  state = initialAuthState,
  acttion: AuthActions
): IAuthState => {
  console.log('Auth Reducer', acttion.type);
  switch (acttion.type) {
    case EAuthActions.toLogRequest: {
      console.log('toLogRequest', acttion);
      return {
        ...state,
        token: '',
      };
    }
    case EAuthActions.toLogSuccess: {
      console.log('toLogSuccess', acttion);
      return {
        ...state,
        token: acttion.payload,
      };
    }
    case EAuthActions.toLogFailed: {
      console.log('toLogFailed', acttion);
      return {
        ...state,
        token: '',
      };
    }
    default:
      console.log('Default');
      return state;
  }
};
