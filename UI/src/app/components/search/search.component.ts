import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() course = '';

  @Output() searchCourse = new EventEmitter<String>();

  readonly input$: Subject<String> = new BehaviorSubject(this.course);

  ngOnInit() {
    this.input$
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe(
      (name) => {
        this.searchCourse.emit(name);
      }
    );
  }

  ngOnDestroy() {
    this.input$.unsubscribe();
  }

  search(): void {
    this.input$.next(this.course);
  }
}
