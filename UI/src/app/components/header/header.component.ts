import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuth: boolean;

  private updateSubscription: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.updateSubscription = this.authService.auth$.subscribe(this.updateAuth.bind(this));
    this.authService.init();
  }

  ngOnDestroy() {
    console.log('HeaderComponent.ngOnDestroy()');

    this.updateSubscription.unsubscribe();
  }


  public logOut(): void {
    const isLogout = this.authService.toLogout();

    if (isLogout) {
      this.router.navigate(['login']);
    }
  }

  private updateAuth(logged: boolean): void {
    this.isAuth = logged;
  }
}
