import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/user';
import { UserInfo } from '../interfaces/user-info';
import { TokenRequestModel } from '../interfaces/token-request-model';
import { IAuthState } from '../interfaces/auth-state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY = 'AuthServiceToken';

  private BASE_URL = 'http://localhost:3004';

  constructor(private http: HttpClient) {}

  public toLogin(email: IUser['email'] = '', password: IUser['password'] = ''): Observable<IAuthState> {
    const credentials = { password, login: email };

    return this.http.post<IAuthState>(`${this.BASE_URL}/auth/login`, credentials).pipe(
      tap(this.saveToken.bind(this)),
    );
  }

  public saveToken = (data): void => {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.token));
  }

  public deleteToken(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public getAuthorizationToken(): Observable<string> {
    return of(JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || '');
  }

  public getUserInfo(token: TokenRequestModel['token']): Observable<UserInfo> {
    const body: TokenRequestModel = { token };

    return this.http.post<UserInfo>(`${this.BASE_URL}/auth/userinfo`,  body);
  }
}
