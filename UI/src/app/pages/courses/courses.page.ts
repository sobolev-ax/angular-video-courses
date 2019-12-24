import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { CoursesListItem } from '../../interfaces/courses-list-item';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesLoad } from 'src/app/interfaces/courses-load';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.sass']
})
export class CoursesPageComponent implements OnInit, OnDestroy {

  public courses: CoursesListItem[] = [];

  public filter = '';

  public isLocalCourses = false;

  private updateSubscription: Subscription;

  private routeSubscription: Subscription;


  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.updateSubscription = this.coursesService.courses$.subscribe(this.updateCourses.bind(this));
    this.routeSubscription = this.activateRoute.queryParams.subscribe(this.updateRoute.bind(this));

    this.coursesService.init(this.filter, this.isLocalCourses);
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }


  public searchCourse(title: CoursesListItem['Title']): void {
    this.filter = title;
    this.coursesService.setFilter(this.filter);
  }

  public addCourse(course: CoursesListItem): void {
    this.router.navigate(['new']);
  }

  public deleteCourse(id: CoursesListItem['Id']): void {
    const question = `Are you sure to delete this course?`;
    const confirmed = confirm(question);

    if (!confirmed) return;

    this.coursesService.removeCourse(id);
  }

  public editCourse(id: CoursesListItem['Id']): void {
    this.router.navigate([`courses/${id}`]);
  }

  public updateCourses(courses: CoursesListItem[]): void {
    this.courses = [...courses];
  }

  public updateRoute(params: Params): void {
    // this.router.navigate(
    //   [''],
    //   {
    //     queryParams:{
    //       start: this.coursesLoad.Start,
    //       count: this.coursesLoad.Count,
    //     }
    //   }
    // );
  }
}
