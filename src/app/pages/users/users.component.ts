import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { DataSourceUser } from './data-source';
import { NgClass } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { UsersService } from '@services/users.service';
import { User } from '@models/users.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgClass,
    CdkTableModule
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private usersService: UsersService = inject(UsersService);
  private authService: AuthService = inject(AuthService);
  
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: Signal<User | null> = signal(null);

  ngOnInit() {
    console.log('chapapote');
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.dataSource.init(users);
    });
    this.user = this.authService.user;
  }
}
