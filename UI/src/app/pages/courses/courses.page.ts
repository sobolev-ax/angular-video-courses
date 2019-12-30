import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { CoursesListItem } from '../../interfaces/courses-list-item';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesListState } from 'src/app/interfaces/courses-list-state';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.sass']
})
export class CoursesPageComponent implements OnInit, OnDestroy {

  private routeSubscription: Subscription;

  private stateSubscription: Subscription;

  private state: CoursesListState = {
    start: 0,
    count: 10,
    step: 10,
    sort: '',
    filter: '',
    textFragment: '',
    courses: [],
    next: true,
  };

  constructor(
    private readonly coursesService: CoursesService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
  ) {
    const start = activateRoute.snapshot.params['start'];
    const count = activateRoute.snapshot.params['count'];
    console.log(start);
  }

  ngOnInit() {
    this.coursesService.setState(this.state);

    this.stateSubscription = this.coursesService.state$.subscribe(this.updateState.bind(this));
    this.routeSubscription = this.activateRoute.queryParams.subscribe(this.updateRoute.bind(this));

    // this.coursesService.getCourses();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }

  editCourse(id: CoursesListItem['id']): void {
    this.router.navigate([`courses/${id}`]);
  }

  addCourse(course: CoursesListItem): void {
    this.router.navigate(['new']);
  }

  searchCourse(title: CoursesListItem['title']): void {
    // this.filter = title;
  }

  deleteCourse(id: CoursesListItem['id']): void {
    const question = `Are you sure to delete this course?`;
    const confirmed = confirm(question);

    if (!confirmed) return;

    this.coursesService.removeCourse(id);
  }

  updateState(state: CoursesListState): void {
    this.state = {
      ...state
    };
  }

  updateRoute(params: Params): void {
    if (params.start !== this.state.start || params.count !== this.state.count) {
      this.router.navigate(
        [''],
        {
          queryParams:{
            start: this.state.start,
            count:  this.state.count,
          }
        }
      );
    }
  }
}
