import { Routes } from "@angular/router";
import { authGuard } from "@guards/auth.guard";
import { UsersComponent } from "./users.component";

export const USERS_ROUTES: Routes = [
    {
      path: '',
      canActivate: [authGuard],
      component: UsersComponent
    }
  ];