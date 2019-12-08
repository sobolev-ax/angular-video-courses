import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) return;
    this.router.navigate(['']);
  }

  logIn(event: IUser): void {
    const isLogin: boolean = this.authService.toLogin(event.email, event.password);

    if (isLogin) {
      this.router.navigate(['']);
    }
  }
}
