import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';
import { User } from '@models/users.model';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  private http: HttpClient = inject(HttpClient);
  apiUrl = environment.API_URL;

  getMeProfile() {
    return this.http.get<User>(`${this.apiUrl}/api/v1/me/profile`, {
      context: checkToken()
    });
  }

  getMeBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/api/v1/me/boards`, {
      context: checkToken()
    });
  }
}
