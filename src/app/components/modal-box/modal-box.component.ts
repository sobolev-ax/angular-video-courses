import { Component, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.sass']
})
export class ModalBoxComponent {

  @Output() logIn = new EventEmitter<IUser>();

  enter(email: string, password: string): void {
    this.logIn.emit({ email, password });
  }
}
