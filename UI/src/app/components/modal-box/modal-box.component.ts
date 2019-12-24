import { Component, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.sass']
})
export class ModalBoxComponent {
  public email: string;
  public password: string;

  @Output() logIn = new EventEmitter<IUser>();

  enter(email: string, password: string): void {
    this.logIn.emit({ email, password });
  }
}
