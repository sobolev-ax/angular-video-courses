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
  public toLogin(email: IUser['email'], password: IUser['password']): void {
    console.log('AuthService: toLogin()');
    const user: IUser = this.getUserInfo(email);

    if (!user) return;
    if (user.password !== password) return;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  @withUpdateAuthentication
  public toLogout(): void {
    console.log('AuthService: toLogout()');
    if (!this.isAuthenticated()) return;

    localStorage.removeItem(this.STORAGE_KEY);
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
