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

  readonly status: boolean;

  private STORAGE_KEY = 'AuthServiceUser';

  constructor(private http: HttpClient) {}

  @withUpdateAuthentication
  public init(): void {}

  @withUpdateAuthentication
  public toLogin(email: IUser['email'], password: IUser['password']): boolean {
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

    console.log('Authentication status:', status);

    return status;
  }


  private getUserInfo(email: IUser['email']): IUser {
    const user: IUser = USERS.find(user => user.email === email);

    return user;
  }

  private shouldUpdate(): boolean {
    const currState: boolean = this.isAuthenticated();

    return this.status !== currState;
  }

  private updateAuthentication(): void {
    const newState: boolean = this.isAuthenticated();

    const shouldUpdate: boolean = this.shouldUpdate();

    if (shouldUpdate) {
      console.log(`Global authentication status updated from ${this.status} to ${newState}`);

      this.status = newState;
      this.auth$.next(this.status);
    } else {
      console.log('Global');
    }
  }
}

function withUpdateAuthentication(
  target: Object,
  method: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    originalMethod.apply(this, args);

    this.updateAuthentication();

    return this.auth$;
  };
}
