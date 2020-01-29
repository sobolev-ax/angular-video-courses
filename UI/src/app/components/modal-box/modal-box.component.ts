import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.sass']
})
export class ModalBoxComponent implements OnInit {
  public form: FormGroup;

  @Output() logIn = new EventEmitter<IUser>();

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  enter(): void {
    this.logIn.emit({
      email: this.form.get('email').value,
      password: this.form.get('password').value
    });
  }
}
