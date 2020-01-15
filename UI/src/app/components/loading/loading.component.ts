import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { getLoading } from 'src/app/store/selectors/common.selector';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;

  private isLoading: boolean;

  constructor(
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.store.pipe(select(getLoading))
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
    )
    .subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
