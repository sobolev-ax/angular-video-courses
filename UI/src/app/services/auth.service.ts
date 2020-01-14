import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';

import { IUser } from '../interfaces/user';
import { UserInfo } from '../interfaces/user-info';
import { TokenRequestModel } from '../interfaces/token-request-model';
import { IAuthState } from '../interfaces/auth-state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly auth$ = new Subject();

  private STORAGE_KEY = 'AuthServiceToken';

  private BASE_URL = 'http://localhost:3004';

  constructor(private http: HttpClient) {}

  public toLogin(email: IUser['email'] = '', password: IUser['password'] = ''): Observable<IAuthState> {
    const credentials = { password, login: email };

    const saveToken = (data): void => {
      console.log('Authentication login: Successful', data);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.token));
    };

    return this.http.post<IAuthState>(`${this.BASE_URL}/auth/login`, credentials).pipe(
      tap(saveToken),
    );
  }

  // public toLogin(email: IUser['email'] = '', password: IUser['password'] = ''): void {
  //   const credentials = { password, login: email };

  //   const gotToken = (): void => {
  //     console.log('Authentication login: Successful');
  //   };

  //   const gotError = (error: any): Observable<string> => {
  //     console.log('Authentication login:', error.error);
  //     return of('');
  //   };

  //   this.http.post(`${this.BASE_URL}/auth/login`, credentials).pipe(
  //     tap(gotToken),
  //     catchError(gotError),
  //   ).subscribe((data: any): void => {
  //     if (data.length === 0) return;

  //     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.token));
  //     this.updateAuthentication();
  //   });
  // }

  @withUpdateAuthentication
  public toLogout(): boolean {
    if (!this.isAuthenticated()) return false;

    localStorage.removeItem(this.STORAGE_KEY);

    return true;
  }

  public getUserInfo(): Observable<UserInfo> {
    if (!this.isAuthenticated()) throw new Error('You should login');

    const token: TokenRequestModel = {
      token: this.getAuthorizationToken(),
    };

    return this.http.post<UserInfo>(`${this.BASE_URL}/auth/userinfo`, token);
  }

  public isAuthenticated(): boolean {
    const status: boolean = !!localStorage.getItem(this.STORAGE_KEY);

    console.log('Authentication status check:', status);

    return status;
  }

  public updateAuthentication(): void {
    const status: boolean = this.isAuthenticated();

    this.auth$.next(status);

    console.log('Authentication send auth$:', status);
  }

  public getAuthorizationToken(): string {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || '';
  }
}

function withUpdateAuthentication(
  target: Object,
  method: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = decorator;

  function decorator(...args) {
    const result: any = originalMethod.apply(this, args);

    this.updateAuthentication();

    return result;
  }
}
