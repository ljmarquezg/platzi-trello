import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from '@guards/auth.guard';

export const LAYOUT_ROUTES: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'boards',
          canActivate: [authGuard],
          pathMatch: 'full'
        },
        {
          path: 'boards',
          canActivate: [authGuard],
          loadChildren: () => import('@boards/boards.routes').then((m) => m.BOARDS_ROUTES),
        },
        {
          path: 'profile',
          canActivate: [authGuard],
          loadChildren: () => import('@profile/profile.routes').then((m) => m.PROFILE_ROUTES),
        },
        {
          path: 'users',
          canActivate: [authGuard],
          loadChildren: () => import('@users/users.routes').then((m) => m.USERS_ROUTES),
        },
      ],
    },
  ];