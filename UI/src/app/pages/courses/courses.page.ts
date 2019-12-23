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

  private coursesLoad: CoursesLoad = {
    Start: 0,
    Step: 5,
    Count: 0,
  };


  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }


  ngOnInit() {
    console.log('CoursesPageComponent.ngOnInit()');

    this.updateSubscription = this.coursesService.courses$.subscribe(this.updateCourses.bind(this));
    this.routeSubscription = this.activateRoute.queryParams.subscribe(this.updateRoute.bind(this));

    this.coursesService.init(this.filter, this.isLocalCourses);
  }

  ngOnDestroy() {
    console.log('CoursesPageComponent.ngOnDestroy()');

    this.updateSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }


  public searchCourse(title: CoursesListItem['Title']): void {
    console.log('CoursesPageComponent.searchCourse()');

    this.filter = title;
    this.coursesService.setFilter(this.filter);
  }

  public addCourse(course: CoursesListItem): void {
    console.log('CoursesPageComponent.addCourse()');

    this.router.navigate(['new']);
    // const newCourse: CoursesListItem = {
    //   Id: 100,
    //   Title: 'New Course',
    //   CreationDate: moment(),
    //   Duration: moment.duration(),
    //   Description: 'New description'
    // };

    // this.coursesService.addCourse(newCourse);
  }

  public deleteCourse(id: CoursesListItem['Id']): void {
    console.log('CoursesPageComponent.deleteCourse(), id:', id);

    const question = `Are you sure to delete this course?`;
    const confirmed = confirm(question);

    if (!confirmed) return;

    this.coursesService.removeCourse(id);
  }

  public editCourse(id: CoursesListItem['Id']): void {
    console.log('CoursesPageComponent.editCourse()');

    this.router.navigate([`courses/${id}`]);

    // const course: CoursesListItem = {
    //   Id: 0,
    //   Title: 'Edited',
    //   CreationDate: moment(),
    //   Duration: moment.duration(),
    //   Description: 'New description'
    // };

    // this.coursesService.updateCourse(course);
  }

  public updateCourses(courses: CoursesListItem[]): void {
    console.log('CoursesPageComponent.updateCourses()');

    this.courses = [...courses];
  }

  public updateRoute(params: Params): void {
    console.log('CoursesPageComponent.updateRoute()');

    this.coursesLoad.Count = this.coursesLoad.Count + this.coursesLoad.Step;

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
