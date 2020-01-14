export interface UserInfo {
  id?: number;
  fakeToken: string;
  name: {
    first: string;
    last: string;
  };
  login: string;
  password: string;
}
