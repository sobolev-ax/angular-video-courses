import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

import { USERS } from './local-data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly auth$ = new Subject();

  private STORAGE_KEY = 'AuthServiceUser';


  @withUpdateAuthentication
  public init(): void {
    console.log('AuthService: init()');
  }

  @withUpdateAuthentication
  public toLogin(email: IUser['email'], password: IUser['password']): boolean {
    console.log('AuthService: toLogin()');
    const user: IUser = this.getUserInfo(email);

    if (!user) return false;
    if (user.password !== password) return false;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

    return true;
  }

  @withUpdateAuthentication
  public toLogout(): boolean {
    console.log('AuthService: toLogout()');
    if (!this.isAuthenticated()) return false;

    localStorage.removeItem(this.STORAGE_KEY);

    return true;
  }

  public isAuthenticated(): boolean {
    console.log('AuthService: isAuthenticated()');
    return !!localStorage.getItem(this.STORAGE_KEY);
  }


  private getUserInfo(email: IUser['email']): IUser {
    console.log('AuthService: getUserInfo()');
    const user: IUser = USERS.find(user => user.email === email);

    return user;
  }
}

function withUpdateAuthentication(
  target: Object,
  method: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    console.log('AuthService: withUpdateAuthentication()');

    originalMethod.apply(this, args);

    this.auth$.next(this.isAuthenticated());

    return this.auth$;
  };
}
