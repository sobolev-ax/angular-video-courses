export interface UserInfo {
  id?: number;
  name: {
    first: string;
    last: string;
  };
  date: string;
  length: number;
  description: string;
  authors: {
    id: number;
    name: string;
  };
  isTopRated: boolean;
}
