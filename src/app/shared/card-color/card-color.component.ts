import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { COLORS, Colors } from '@models/color.model';
import { Board } from '@models/board.model';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLinkWithHref,
    NgClass
  ],
  templateUrl: './card-color.component.html',
})
export class CardColorComponent {
  @Input({required: true}) board: Board = {} as Board;
  
  faStar = faStar;

  get bgColorClass() {
    return COLORS[this.board.backgroundColor];
  }
}
