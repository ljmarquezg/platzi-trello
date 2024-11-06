import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private http: HttpClient = inject(HttpClient)
  private apiUrl  = environment.API_URL;

  getBoard(id: Board['id']): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken()
    });

  }
}
