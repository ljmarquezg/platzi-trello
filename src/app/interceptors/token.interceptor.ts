import {
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { TokenService } from "@services/token.service";
import { Observable, switchMap } from "rxjs";

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);

  intercept(req: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(req.context.get(CHECK_TOKEN)) {
      const isValidToken = this.tokenService.isValidToken();
      if(isValidToken){
        return this.addToken(req, next);
      } else {
        this.updateAccessTokenAndRefreshToken(req, next);
      }
    }
    return next.handle(req);
  }

  private addToken(req: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    if (accessToken) {
      const authRequest = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${accessToken}`),
      })
      return next.handle(authRequest);
    }

    return next.handle(req);
  }

  private updateAccessTokenAndRefreshToken(req: HttpRequest<unknown>, next: HttpHandler) { 
    const refreshToken = this.tokenService.getRefreshToken();
    const isValidRefreshToken = this.tokenService.isValidRefreshToken(); 

    if(refreshToken && isValidRefreshToken) {
      return this.authService.refreshToken(refreshToken).pipe(
        switchMap(() => this.addToken(req, next))
      )
    }

    return next.handle(req);
  }
}
