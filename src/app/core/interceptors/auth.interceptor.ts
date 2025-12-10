import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Adicionar token automaticamente se o usuário estiver autenticado
    const token = this.authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se erro 401 (não autorizado), tentar renovar token
        if (error.status === 401 && token) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              // Token renovado, tentar novamente a requisição
              const newToken = this.authService.getToken();
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              return next.handle(newReq);
            }),
            catchError(() => {
              // Se não conseguir renovar, fazer logout
              this.authService.logout();
              return throwError(() => error);
            }),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
