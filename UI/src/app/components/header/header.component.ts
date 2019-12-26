import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/user-info';

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


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.updateSubscription = this.authService.auth$.subscribe(this.updateAuth.bind(this));
    this.authService.updateAuthentication();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();

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
      this.userInfoSubscription = this.authService.getUserInfo().subscribe((user: UserInfo) => {
        this.name = `${user.name.first} ${user.name.last}`;
      });
    } else {
      this.name = '';
    }
  }
}
