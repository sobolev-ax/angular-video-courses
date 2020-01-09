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

  private stateSubscription: Subscription;

  private state: CoursesListState = {
    start: 0,
    count: 7,
    step: 10,
    sort: '',
    filter: '',
    textFragment: '',
    courses: [],
    next: true,
  };

  private filter: string = this.state.textFragment;

  constructor(
    private readonly coursesService: CoursesService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.coursesService.setState(this.state);

    this.stateSubscription = this.coursesService.state$.subscribe(this.updateState.bind(this));

    this.coursesService.getListCourses();
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  editCourse(id: CoursesListItem['id']): void {
    this.router.navigate([`courses/${id}`]);
  }

  addCourse(course: CoursesListItem): void {
    this.router.navigate(['new']);
  }

  getNextCourses(): void {
    this.coursesService.getNextListCourses();
  }

  searchCourse(text: string): void {
    this.coursesService.getTextFragmentListCourses(text);
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
}
