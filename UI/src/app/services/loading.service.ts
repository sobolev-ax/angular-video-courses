import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  readonly loading$: Subject<boolean> = new BehaviorSubject(this.isLoading);

  setLoading(loading: boolean): void {
    this.loading$.next(loading);
  }
}
