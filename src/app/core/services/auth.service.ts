import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse, LoginDto, User } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(private apiService: ApiService) {
    // Restaurar usuário do localStorage ao inicializar
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userData = localStorage.getItem(this.userKey);

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch {
        // Se não conseguir fazer o parse, limpar dados inválidos
        this.clearStorage();
      }
    }
  }

  private clearStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  // Fazer login
  login(credentials: LoginDto): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/login', credentials).pipe(
      tap((response) => {
        if (response?.access_token) {
          // Armazenar token
          localStorage.setItem(this.tokenKey, response.access_token);

          // Armazenar usuário se fornecido
          if (response.user) {
            localStorage.setItem(this.userKey, JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
        }
      }),
      catchError((error) => {
        console.error('Erro no login:', error);
        return throwError(() => error);
      }),
    );
  }

  // Fazer logout
  logout(): void {
    this.clearStorage();
    // Aqui você pode também fazer uma chamada para o backend para invalidar o token
    // this.apiService.post('auth/logout', {}, this.getToken()).subscribe();
  }

  // Verificar se está logado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Aqui você pode adicionar verificação de expiração do token
    return !this.isTokenExpired(token);
  }

  // Obter token atual
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Obter usuário atual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Verificar se token expirou (implementação básica)
  private isTokenExpired(token: string): boolean {
    try {
      // Decodificar JWT payload (implementação simplificada)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;

      if (!expiry) return false;

      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } catch {
      // Se não conseguir decodificar, considerar como expirado
      return true;
    }
  }

  // Atualizar dados do usuário
  updateUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Verificar permissões (exemplo para admin)
  hasPermission(_permission: string): boolean {
    const user = this.getCurrentUser();
    // Implementar lógica de permissões baseada no usuário
    // TODO: Implementar verificação real de permissões baseada no parâmetro _permission
    return user !== null; // Implementação básica
  }

  // Renovar token (se sua API suportar)
  refreshToken(): Observable<AuthResponse> {
    const currentToken = this.getToken();
    if (!currentToken) {
      return throwError(() => ({ error: 'Nenhum token encontrado' }));
    }

    return this.apiService.post<AuthResponse>('auth/refresh', {}, currentToken).pipe(
      tap((response) => {
        if (response?.access_token) {
          localStorage.setItem(this.tokenKey, response.access_token);
        }
      }),
      catchError((error) => {
        // Se não conseguir renovar, fazer logout
        this.logout();
        return throwError(() => error);
      }),
    );
  }
}
