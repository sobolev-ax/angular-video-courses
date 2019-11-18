import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appRelevance]'
})
export class RelevanceDirective implements OnInit, OnChanges {

  @Input('appRelevance') appRelevanceDate: moment.Moment;

  private borders = {
    new: '--opacity-sun-color',
    future: '--opacity-sky-color',
  };

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.toRelevance();
  }

  ngOnChanges() {
    this.toRelevance();
  }

  private toRelevance(): void {
    const creation = this.appRelevanceDate.hours(0).minutes(0).seconds(0);
    const curr = moment().hours(0).minutes(0).seconds(0);

    if (creation < curr && creation >= curr.subtract(14, 'days')) {
      this.updateBorder(this.borders.new);
    } else if (creation > curr) {
      this.updateBorder(this.borders.future);
    }
  }

  private updateBorder(color: String) {
    const child = this.elementRef.nativeElement.children[0];

    child.style.setProperty('--article-color', `var(${color})`);
  }
}
