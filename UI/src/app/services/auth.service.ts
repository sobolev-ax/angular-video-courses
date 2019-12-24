import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

import { USERS } from './local-data';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly auth$ = new Subject();

  private STORAGE_KEY = 'AuthServiceUser';

  constructor(private http: HttpClient) {}

  @withUpdateAuthentication
  public toLogin(email: IUser['email'], password: IUser['password']): boolean {

    const body = { login: 'admin', password: 'admin' };
    console.log(this.http.post('http://localhost:3004/auth/login', body));
    console.log(1);

    const user: IUser = this.getUserInfo(email);

    if (!user) return false;
    if (user.password !== password) return false;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

    return true;
  }

  @withUpdateAuthentication
  public toLogout(): boolean {
    if (!this.isAuthenticated()) return false;

    localStorage.removeItem(this.STORAGE_KEY);

    return true;
  }

  public isAuthenticated(): boolean {
    const status: boolean = !!localStorage.getItem(this.STORAGE_KEY);

    console.log('Authentication status check:', status);

    return status;
  }


  private getUserInfo(email: IUser['email']): IUser {
    const user: IUser = USERS.find(user => user.email === email);

    return user;
  }

  public updateAuthentication(): void {
    const status: boolean = this.isAuthenticated();

    this.auth$.next(status);

    console.log('Authentication send auth$:', status);
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
