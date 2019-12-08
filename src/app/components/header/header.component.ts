import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public isAuth: boolean;


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit() {
    console.log('CoursesPageComponent.ngOnInit()');

    this.authService.auth$.subscribe(this.updateAuth.bind(this));
    this.authService.init();
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
