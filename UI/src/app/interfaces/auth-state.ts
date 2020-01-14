import { UserInfo } from './user-info';

export interface IAuthState {
  token: string;
  user: UserInfo;
}
