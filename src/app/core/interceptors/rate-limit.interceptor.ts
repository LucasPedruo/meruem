import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface RateLimitStore {
  [key: string]: { count: number; lastRequest: number };
}

@Injectable()
export class RateLimitInterceptor implements HttpInterceptor {
  private store: RateLimitStore = {};
  private readonly WINDOW_MS = 60 * 1000;
  private readonly MAX_REQUESTS = 30;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;

    if (this.isRateLimited(url)) {
      console.error('Rate limit excedido para:', url);
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 429,
            statusText: 'Too Many Requests',
            error: { message: 'Muitas requisições. Tente novamente em um momento.' },
          }),
      );
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 429) {
          console.error('Rate limit do servidor:', error);
        }
        return throwError(() => error);
      }),
    );
  }

  private isRateLimited(url: string): boolean {
    const now = Date.now();
    const entry = this.store[url];

    if (!entry) {
      this.store[url] = { count: 1, lastRequest: now };
      return false;
    }

    if (now - entry.lastRequest > this.WINDOW_MS) {
      this.store[url] = { count: 1, lastRequest: now };
      return false;
    }

    if (entry.count >= this.MAX_REQUESTS) {
      return true;
    }

    this.store[url].count += 1;
    this.store[url].lastRequest = now;
    return false;
  }
}
