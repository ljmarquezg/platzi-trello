
import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { BtnComponent } from '../../shared/btn/btn.component';
import { AuthService } from '@services/auth.service';
import { User } from '@models/users.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    BtnComponent,
    OverlayModule
],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private authService: AuthService = inject(AuthService);
  isOpen = false;
  user: WritableSignal<User | null> = this.authService.user;

  logout() {
    this.authService.logout();
  }
  
}
