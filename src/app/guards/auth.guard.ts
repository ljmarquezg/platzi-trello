import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router: Router = inject(Router);
  const isValidToken = tokenService.isValidRefreshToken();
  if(!isValidToken){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
