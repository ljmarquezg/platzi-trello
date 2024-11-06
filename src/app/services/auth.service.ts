import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '@environments/environment';
import { RecoveryTokenResponse } from '@models/request-status.model';
import { ResponseLogin } from '@models/auth.model';
import { Observable, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { User } from '@models/users.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient);
  private tokenService: TokenService = inject(TokenService);
  private router: Router = inject(Router);
  user: WritableSignal<User | null> = signal(null);

  apiUrl = environment.API_URL;
  credentials!: {
    email: string;
    password: string;
  }

  setCredentials(email: string, password: string) {
    this.credentials = { email, password };
  }

  getCredential() {
    return this.credentials;
  }

  login(email: string, password: string) {
      return this.http.post<ResponseLogin>(
        `${this.apiUrl}/api/v1/auth/login`,
        { email, password }
      ).pipe(
        tap(({access_token, refresh_token}) => {
          this.tokenService.saveToken(access_token)
          this.tokenService.saveRefreshToken(refresh_token)
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(
      `${this.apiUrl}/api/v1/auth/register`,
      { name, email, password }
    );
  }

  registerAndLogin(name: string, email: string, password: string): Observable<Object> {
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string): Observable<{isAvailable: boolean}> {
    return this.http.post<{isAvailable: boolean}>(
      `${this.apiUrl}/api/v1/auth/is-available`,
      { email }
    );
  }

  recovery(email: string): Observable<RecoveryTokenResponse> {
    return this.http.post<RecoveryTokenResponse>(
      `${this.apiUrl}/api/v1/auth/recovery`,
      { email }
    );
  }

  changePassword(token: string, newPassword: string): Observable<RecoveryTokenResponse> {
    return this.http.post<RecoveryTokenResponse>(
      `${this.apiUrl}/api/v1/auth/change-password`,
      { token, newPassword }
    );
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  getProfile(): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`, {context: checkToken()}
    ).pipe(
      tap(user => this.user.set(user))
    )
  }

  getDataUser(): User | null {
    return this.user();
  }

  refreshToken(refreshToken: string): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(
      `${this.apiUrl}/api/v1/auth/refresh-token`,
      {refreshToken}
    ).pipe(
      tap(({access_token, refresh_token}) => {
        this.tokenService.saveToken(access_token)
        this.tokenService.saveRefreshToken(refresh_token)
      })
    )
  }
}
