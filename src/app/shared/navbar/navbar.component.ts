
import { Component, signal, WritableSignal } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import { BtnComponent } from '../../shared/btn/btn.component';
import {faAngleDown, faBars, faBell, faSearch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    BtnComponent,
    ProfileComponent,
    OverlayModule,
    FontAwesomeModule,
    ProfileComponent
],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  isOpenBody = false;

  faBell = faBell;
  faSearch = faSearch;
  faAngleDown = faAngleDown;
  faBars = faBars;
}
