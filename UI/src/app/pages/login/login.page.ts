import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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

  private authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.auth$.subscribe(this.updateAuth.bind(this));

    this.authService.updateAuthentication();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logIn(event: IUser): void {
    this.store.dispatch(new LogRequest({
      email: event.email,
      password: event.password,
    }));
  }

  private updateAuth(isLogin): void {
    if (isLogin) {
      this.router.navigate(['']);
    }
  }
}
