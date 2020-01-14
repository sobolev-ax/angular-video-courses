import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/user-info';
import { Store, select } from '@ngrx/store';
import { selectAuthToken } from 'src/app/store/selectors/auth.selector';
import { IAppState } from 'src/app/interfaces/app-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuth: boolean;

  public name = '';

  private updateSubscription: Subscription;
  private userInfoSubscription: Subscription;
  private authSubscription: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<IAppState>,
  ) { }


  ngOnInit() {
    this.updateSubscription = this.authService.auth$.subscribe(this.updateAuth.bind(this));
    this.authService.updateAuthentication();
    this.authSubscription = this.store.pipe(select(selectAuthToken)).subscribe((token) => {
      console.log(token);
    });
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
    this.authSubscription.unsubscribe();

    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }


  public logOut(): void {
    const isLogout = this.authService.toLogout();

    if (isLogout) {
      this.router.navigate(['login']);
    }
  }

  private updateAuth(logged: boolean): void {
    this.isAuth = logged;

    if (logged) {
      this.userInfoSubscription = this.authService.getUserInfo().subscribe((user: UserInfo | null) => {
        this.name = `${user.name.first} ${user.name.last}`;
      });
    } else {
      this.name = '';
    }
  }
}
