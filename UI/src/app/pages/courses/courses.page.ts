import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { CoursesListItem } from '../../interfaces/courses-list-item';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { ICoursesPageState } from 'src/app/interfaces/courses-page-state';
import { getCoursesPageState } from 'src/app/store/selectors/courses.selector';
import { CoursesRequest, CoursesSetFilter, CoursesRequestMore } from 'src/app/store/actions/courses.actions';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.sass']
})
export class CoursesPageComponent implements OnInit, OnDestroy {

  private stateSubscription: Subscription;

  private state: ICoursesPageState = {
    textFragment: '',
    courses: [],
    next: true,
  };

  constructor(
    private readonly coursesService: CoursesService,
    private readonly router: Router,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.stateSubscription = this.store.pipe(select(getCoursesPageState)).subscribe((state) => {
      this.state = state;
    });

    this.store.dispatch(new CoursesRequest());
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  editCourse(id: CoursesListItem['id']): void {
    this.router.navigate([`courses/${id}`]);
  }

  addCourse(): void {
    this.router.navigate(['new']);
  }

  getNextCourses(): void {
    this.store.dispatch(new CoursesRequestMore());
  }

  searchCourse(text: string): void {
    this.store.dispatch(new CoursesSetFilter(text));
  }

  deleteCourse(id: CoursesListItem['id']): void {
    const question = `Are you sure to delete this course?`;
    const confirmed = confirm(question);

    if (!confirmed) return;

    this.coursesService.removeCourse(id);
  }
}
