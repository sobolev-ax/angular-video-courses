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
        user: null,
      };
    }
    case EAuthActions.toLogSuccess: {
      console.log('toLogSuccess', acttion);
      return {
        ...state,
        token: acttion.payload,
        user: null,
      };
    }
    case EAuthActions.toLogFailed: {
      console.log('toLogFailed', acttion);
      return {
        ...state,
        token: '',
        user: null,
      };
    }
    case EAuthActions.toLogOut: {
      console.log('toLogOut', acttion);
      return {
        ...state,
        token: '',
        user: null,
      };
    }
    case EAuthActions.toUserRequest: {
      console.log('toUserRequest', acttion);
      return {
        ...state,
        user: null,
      };
    }
    case EAuthActions.toUserSuccess: {
      console.log('toUserSuccess', acttion);
      return {
        ...state,
        user: acttion.payload,
      };
    }
    case EAuthActions.toUserFailed: {
      console.log('toUserFailed', acttion);
      return {
        ...state,
        user: null,
      };
    }
    case EAuthActions.toUserOut: {
      console.log('toUserOut', acttion);
      return {
        ...state,
        user: null,
      };
    }
    case EAuthActions.toGetLocalTokenRequest: {
      console.log('toGetLocalTokenRequest', acttion);
      return {
        ...state,
        token: '',
        user: null,
      };
    }
    case EAuthActions.toGetLocalTokenSuccess: {
      console.log('toGetLocalTokenSuccess', acttion);
      return {
        ...state,
        token: acttion.payload,
        user: null,
      };
    }
    default:
      console.log('Default');
      return state;
  }
};
