import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(token?: string): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do servidor
      errorMessage = `Código: ${error.status}, Mensagem: ${error.message}`;
    }

    console.error('API Error:', errorMessage);
    return throwError(() => ({ error: errorMessage }));
  }

  // GET request
  get<T>(endpoint: string, token?: string): Observable<T> {
    const headers = this.getHeaders(token);

    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // POST request
  post<T>(endpoint: string, data: any, token?: string): Observable<T> {
    const headers = this.getHeaders(token);

    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // PUT request
  put<T>(endpoint: string, data: any, token?: string): Observable<T> {
    const headers = this.getHeaders(token);

    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // DELETE request
  delete<T>(endpoint: string, token?: string): Observable<T> {
    const headers = this.getHeaders(token);

    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // PATCH request
  patch<T>(endpoint: string, data: any, token?: string): Observable<T> {
    const headers = this.getHeaders(token);

    return this.http
      .patch<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
}
