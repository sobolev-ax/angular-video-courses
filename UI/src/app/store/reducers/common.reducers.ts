import { CommonActions, ECommonActions } from '../actions/common.actions';
import { initialCommonState } from '../state/common.state';
import { ICommonState } from 'src/app/interfaces/common-state';

export const commonReducer = (
  state = initialCommonState,
  acttion: CommonActions
): ICommonState => {
  console.log('Common Reducer', acttion.type);
  switch (acttion.type) {
    case ECommonActions.toLoadingOn: {
      console.log('toLoadingOn', acttion);
      return {
        ...state,
        loading: true,
      };
    }
    case ECommonActions.toLoadingOff: {
      console.log('toLoadingOff', acttion);
      return {
        ...state,
        loading: false,
      };
    }
    default:
      console.log('Default');
      return state;
  }
};
