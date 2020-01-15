import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/user-info';
import { Store, select } from '@ngrx/store';
import { selectAuthToken, checkAuth, getUser } from 'src/app/store/selectors/auth.selector';
import { IAppState } from 'src/app/interfaces/app-state';
import { take } from 'rxjs/operators';
import { UserRequest, LogOut } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuth: boolean;
  public name = '';

  private userInfoSubscription: Subscription;
  private tokenSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.tokenSubscription = this.store.pipe(select(selectAuthToken)).subscribe((token) => {
      this.store.pipe(select(checkAuth), take(1)).subscribe(auth => this.isAuth = auth);

      if (!this.isAuth) {
        this.router.navigate(['login']);
        return;
      }

      this.store.dispatch(new UserRequest(token));
    });

    this.userInfoSubscription = this.store.pipe(select(getUser)).subscribe((user: UserInfo) => {
      if (!user) {
        this.name = '';
        return;
      }

      this.name = `${user.name.first} ${user.name.last}`;
    });
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
    this.userInfoSubscription.unsubscribe();
  }

  public logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
