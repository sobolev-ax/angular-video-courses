import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { RelevanceDirective } from './relevance.directive';
import * as moment from 'moment';

describe('RelevanceDirective', () => {
  let fixture;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        RelevanceDirective,
        TestComponent
      ],
    })
    .createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should have two relevence elements', () => {
    const directives = fixture.debugElement.queryAll(By.directive(RelevanceDirective));

    expect(directives.length).toBe(3);
  });

  it('should higlight fresh course', () => {
    const article = fixture.debugElement.query(By.css('#elToday')).children[0];
    const newColor = getComputedStyle(article.nativeElement).getPropertyValue('--article-color');
    const correctColor = getComputedStyle(document.body).getPropertyValue('--opacity-sun-color');

    expect(newColor).toBe(correctColor);
  });

  it('should higlight future course', () => {
    const article = fixture.debugElement.query(By.css('#elNextDay')).children[0];
    const newColor = getComputedStyle(article.nativeElement).getPropertyValue('--article-color');
    const correctColor = getComputedStyle(document.body).getPropertyValue('--opacity-sky-color');

    expect(newColor).toBe(correctColor);
  });

  it('should doesnt higlight old course', () => {
    const article = fixture.debugElement.query(By.css('#elTwoWeeksAgo')).children[0];
    const newColor = getComputedStyle(article.nativeElement).getPropertyValue('--article-color');
    const correctColor = '';

    expect(newColor).toBe(correctColor);
  });
});

@Component({
  template: `
  <div id="elToday" [appRelevance]="today">
    <article></article>
  </div>
  <div id="elNextDay" [appRelevance]="nextDay">
    <article></article>
  </div>
  <div id="elTwoWeeksAgo" [appRelevance]="twoWeeksAgo">
    <article></article>
  </div>`
})
class TestComponent {
  today: moment.Moment = moment();
  nextDay: moment.Moment = moment().add(1, 'days');
  twoWeeksAgo: moment.Moment = moment().subtract(14, 'days');
}
