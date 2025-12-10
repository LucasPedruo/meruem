import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    const requestId = this.generateRequestId();

    // Log da requisição
    console.warn(`🔄 [${requestId}] ${req.method} ${req.url}`);

    if (req.body && this.shouldLogBody(req)) {
      console.warn(`📤 [${requestId}] Body:`, req.body);
    }

    if (req.headers.keys().length > 0) {
      const headers: { [key: string]: string } = {};
      req.headers.keys().forEach((key) => {
        // Não logar headers sensíveis
        if (!this.isSensitiveHeader(key)) {
          headers[key] = req.headers.get(key) || '';
        }
      });
      console.warn(`📋 [${requestId}] Headers:`, headers);
    }

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          // Log apenas da resposta final
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            const size = this.getResponseSize(event);

            console.warn(
              `✅ [${requestId}] ${req.method} ${req.url} - ${event.status} ${event.statusText} - ${elapsed}ms${size ? ` - ${size}` : ''}`,
            );

            if (event.body && this.shouldLogResponseBody(event)) {
              console.warn(`📥 [${requestId}] Response:`, event.body);
            }
          }
        },
        error: (error) => {
          const elapsed = Date.now() - started;
          console.error(`❌ [${requestId}] ${req.method} ${req.url} - ${elapsed}ms - Error:`, {
            status: error.status,
            message: error.message,
            error: error.error,
          });
        },
      }),
    );
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  private shouldLogBody(req: HttpRequest<any>): boolean {
    // Não logar body de requisições grandes ou com dados sensíveis
    const sensitiveEndpoints = ['auth', 'login', 'password', 'token'];
    const url = req.url.toLowerCase();

    return !sensitiveEndpoints.some((endpoint) => url.includes(endpoint));
  }

  private shouldLogResponseBody(response: HttpResponse<any>): boolean {
    // Não logar responses muito grandes
    const size = this.getResponseSizeBytes(response);
    return size < 10000; // 10KB limit
  }

  private isSensitiveHeader(headerName: string): boolean {
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key', 'x-auth-token'];
    return sensitiveHeaders.includes(headerName.toLowerCase());
  }

  private getResponseSize(response: HttpResponse<any>): string | null {
    const contentLength = response.headers.get('Content-Length');
    if (contentLength) {
      const bytes = parseInt(contentLength, 10);
      return this.formatBytes(bytes);
    }

    // Estimar tamanho baseado no body
    const estimatedSize = this.getResponseSizeBytes(response);
    return estimatedSize > 0 ? this.formatBytes(estimatedSize) : null;
  }

  private getResponseSizeBytes(response: HttpResponse<any>): number {
    if (response.body) {
      try {
        return JSON.stringify(response.body).length;
      } catch {
        return 0;
      }
    }
    return 0;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
