import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './interfaces/app-state';
import { GetLocalTokenRequest } from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetLocalTokenRequest());
  }
}
