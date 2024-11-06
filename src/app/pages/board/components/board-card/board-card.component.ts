import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ColorClass, ColorClassOptions } from '@models/color.model';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLinkWithHref,
    NgClass
  ],
  templateUrl: './board-card.component.html',
})
export class BoardCardComponent {
  @Input({required: true}) label: string = '';
  @Input() bgColor: ColorClassOptions = 'default';
  @Input() isStarred = false;
  @Input() img?: string;
  faStar = faStar;

  get bgColorClass() {
    return ColorClass[this.bgColor];
  }
}
