import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { delayWhen, retryWhen, take } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const maxRetries = 3;
    const retryDelay = 1000;

    return next.handle(req).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delayWhen((error: HttpErrorResponse, retryCount: number) => {
            // Só tentar novamente em caso de erros de rede ou servidor (5xx)
            // Não tentar novamente para erros de cliente (4xx) exceto 408, 429
            const shouldRetry = this.shouldRetry(error, retryCount, maxRetries);

            if (!shouldRetry) {
              return throwError(() => error);
            }

            console.warn(`Tentativa ${retryCount + 1} de ${maxRetries} - Erro ${error.status}`);
            // Delay progressivo baseado na configuração
            return timer((retryCount + 1) * retryDelay);
          }),
          take(maxRetries),
        ),
      ),
    );
  }

  private shouldRetry(error: HttpErrorResponse, retryCount: number, maxRetries: number): boolean {
    // Não tentar mais se excedeu o limite
    if (retryCount >= maxRetries - 1) {
      return false;
    }

    // Erros que permitem retry
    const retryableStatuses = [0, 408, 429, 500, 502, 503, 504];

    // Erro de rede (status 0) ou erros de servidor específicos
    return retryableStatuses.includes(error.status) || error.status >= 500;
  }
}
