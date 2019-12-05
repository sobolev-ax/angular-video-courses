import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces/user';


@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass']
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
  ) { }

  logIn(event: IUser): void {
    this.authService.toLogin(event.email, event.password);
  }
}
