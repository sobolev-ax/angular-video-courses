import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    this.authService.toLogout();
  }


  private updateAuth(logged: boolean): void {
    this.isAuth = logged;

    if (this.isAuth) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
