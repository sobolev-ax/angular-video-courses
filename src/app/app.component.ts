import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-video-courses';

  @Input() courseName: String;

  public search(name): void {
    console.log('search, input', name);
    this.courseName = name;
  }
}
