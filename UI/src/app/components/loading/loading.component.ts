import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;

  private isLoading: boolean;

  constructor(
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loading$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
    )
    .subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
