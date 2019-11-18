import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  @Input() isAuth: boolean;

  @Output() logOff = new EventEmitter();
  @Output() logIn = new EventEmitter();

  off(): void {
    this.logOff.emit();
  }

  in(): void {
    this.logIn.emit();
  }
}
