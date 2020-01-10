import { UserInfo } from 'src/app/interfaces/user-info';

export interface IAuthState {
  token: string;
  user: UserInfo;
}

export const initialAuthState: IAuthState = {
  token: null,
  user: null,
};
