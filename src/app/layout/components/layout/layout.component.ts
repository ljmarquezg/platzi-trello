import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
 
  ngOnInit(): void {
    this.authService.getProfile().subscribe();
  }
}
