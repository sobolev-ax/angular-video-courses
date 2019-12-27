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
  };

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    const start = activateRoute.snapshot.params['start'];
    const count = activateRoute.snapshot.params['count'];
    console.log(start);
  }

  ngOnInit() {
    this.coursesService.setState(this.state);

    this.stateSubscription = this.coursesService.state$.subscribe(this.updateState.bind(this));
    this.routeSubscription = this.activateRoute.queryParams.subscribe(this.updateRoute.bind(this));

    this.coursesService.updateCourses();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }

  public editCourse(id: CoursesListItem['id']): void {
    this.router.navigate([`courses/${id}`]);
  }

  public addCourse(course: CoursesListItem): void {
    this.router.navigate(['new']);
  }

  public searchCourse(title: CoursesListItem['title']): void {
    // this.filter = title;
  }

  public deleteCourse(id: CoursesListItem['id']): void {
    const question = `Are you sure to delete this course?`;
    const confirmed = confirm(question);

    if (!confirmed) return;

    this.coursesService.removeCourse(id);
  }

  public updateState(state: CoursesListState): void {
    this.state = {
      ...state
    };
  }

  public updateRoute(params: Params): void {
    // this.router.navigateByUrl(
    //   'courses',
    //   {
    //     queryParams:{
    //       start: this.state.start,
    //       count:  this.state.count,
    //     }
    //   }
    // );
    if (params.start !== this.state.start || params.count !== this.state.count) {
      console.log(1);
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
