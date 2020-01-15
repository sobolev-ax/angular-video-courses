import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectAuthToken } from 'src/app/store/selectors/auth.selector';
import { LogRequest } from 'src/app/store/actions/auth.actions';
import { IAppState } from 'src/app/interfaces/app-state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  private tokenSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.tokenSubscription = this.store.pipe(select(selectAuthToken)).subscribe(this.checkToken.bind(this));
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  logIn(event: IUser): void {
    this.store.dispatch(new LogRequest({
      email: event.email,
      password: event.password,
    }));
  }

  private checkToken(token): void {
    if (token.length === 0) return;

    this.router.navigate(['']);
  }
}
