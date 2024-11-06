import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { RegisterComponent } from "./pages/register/register.component";
import { RecoveryComponent } from "./pages/recovery/recovery.component";
import { LoginComponent } from "./pages/login/login.component";

export const AUTH_ROUTES: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login'
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
      title: 'Forgot Password'
    },
    {
      path: 'register',
      component: RegisterComponent,
      title: 'Register'
    },
    {
      path: 'recovery',
      component: RecoveryComponent,
      title: 'Recovery'
    }
  ];