import { JsonPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ColorClass, ColorClassOptions, TextAlign } from '../../models/color.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgClass,
    JsonPipe
  ],
  templateUrl: './btn.component.html'
})
export class BtnComponent {
  @Input() typeBtn: 'submit' | 'button' | 'reset' = 'button';
  @Input() color: ColorClassOptions = 'default';
  @Input() size?: 'lg' | 'md' |'sm' | 'xs';
  @Input() textAlign: 'left' | 'center' | 'right' = 'center';
  @Input() loading = false;
  @Input() disabled = false;
  faSpinner = faSpinner;
  
  btnSize = {
    lg: 'px-6 py-3 text-lg',
    md: 'px-4 py-2 text-md',
    sm: 'px-3 py-1 text-sm',
    xs: 'px-2 py-1 text-xs'
  }

  get colors() {
    return ColorClass[this.color];
  }

  get sizes() {    
    if(this.size) {
      return this.btnSize[this.size];
    }
    return this.size
  }

  get textAlignClass() {
    return TextAlign[this.textAlign];
  }

  get classes() {
    let classes = '';

    if(this.color) {
      classes += this.colors;
    }

    if(this.size) {
      classes += ' ' + this.sizes;
    }

    if(this.textAlign) {
      classes += ' ' + this.textAlignClass;
    }
    return classes;
  }
}
