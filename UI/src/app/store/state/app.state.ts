import { initialAuthState } from './auth.state';
import { IAppState } from 'src/app/interfaces/app-state';
import { initialCommonState } from './common.state';

export const initialAppState: IAppState = {
  auth: initialAuthState,
  common: initialCommonState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
