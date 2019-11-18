import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

import { USERS } from './local-data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly user$ = new Subject();

  private STORAGE_KEY = 'AuthServiceUser';

  public toLogin(email: IUser['email'], password: IUser['password']): void {
    const user: IUser = this.getUserInfo(email);

    if (!user) return;
    if (user.password !== password) return;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.user$.next();
  }

  public toLogout(): void {
    if (!this.isAuthenticated()) return;

    localStorage.removeItem(this.STORAGE_KEY);
    this.user$.next();
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  public getUserInfo(email: IUser['email']): IUser {
    const user: IUser = USERS.find(user => user.email === email);

    return user;
  }
}
