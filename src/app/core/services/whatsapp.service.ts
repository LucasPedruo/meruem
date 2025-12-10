import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { map, catchError, retryWhen, delayWhen, take } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Group, InviteResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WhatsAppService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  // Obter grupos permitidos
  getPermittedGroups(): Observable<Group[]> {
    return this.apiService.get<{ data: Group[] }>('wpp/groups/permitted').pipe(
      map((response) => response.data || []),
      catchError((error) => {
        console.error('Error on get groups:', error);
        return throwError(() => ({ error: 'Erro ao buscar grupos' }));
      }),
    );
  }

  // Convidar para grupo com retry automático
  inviteToGroup(groupId: string, phoneNumber: string): Observable<InviteResponse> {
    const maxRetries = 3;

    return this.apiService
      .post<InviteResponse>('wpp/groups/add-to-group', {
        groupId: groupId,
        number: phoneNumber,
      })
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            delayWhen((_, i) => {
              console.warn(`Tentativa ${i + 1} de ${maxRetries} para adicionar ao grupo`);
              return timer((i + 1) * 1000); // Delay progressivo: 1s, 2s, 3s
            }),
            take(maxRetries),
            catchError((err) => {
              console.error('Todas as tentativas falharam:', err);
              return throwError(() => ({ error: 'Erro ao convidar para grupo após 3 tentativas' }));
            }),
          ),
        ),
        catchError((error) => {
          console.error('Erro ao convidar para grupo:', error);
          return throwError(() => ({ error: 'Erro ao convidar para grupo' }));
        }),
      );
  }

  // Convidar para CodeQueens (grupo específico)
  inviteToCodeQueens(phoneNumber: string): Observable<InviteResponse> {
    return this.apiService.get<InviteResponse>(`wpp/invite-codequeens/${phoneNumber}`).pipe(
      catchError((error) => {
        console.error('Erro ao convidar para codequeens:', error);
        return throwError(() => ({ error: 'Erro ao convidar para CodeQueens' }));
      }),
    );
  }

  // Verificar status de um grupo
  getGroupStatus(groupId: string): Observable<any> {
    return this.apiService.get(`wpp/groups/${groupId}/status`).pipe(
      catchError((error) => {
        console.error('Erro ao verificar status do grupo:', error);
        return throwError(() => ({ error: 'Erro ao verificar status do grupo' }));
      }),
    );
  }

  // Obter membros de um grupo (se disponível na API)
  getGroupMembers(groupId: string): Observable<any[]> {
    return this.apiService.get<any[]>(`wpp/groups/${groupId}/members`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar membros do grupo:', error);
        return throwError(() => ({ error: 'Erro ao buscar membros do grupo' }));
      }),
    );
  }

  // Limpar número de telefone (remover caracteres especiais)
  cleanPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/[^a-zA-Z0-9]/g, '');
  }

  // Validar formato de número de telefone brasileiro
  validateBrazilianPhone(phoneNumber: string): boolean {
    const cleanNumber = this.cleanPhoneNumber(phoneNumber);
    // Formato: +55 + DDD (2 dígitos) + número (8 ou 9 dígitos)
    const brazilianPhoneRegex = /^55\d{2}[9]?\d{8}$/;
    return brazilianPhoneRegex.test(cleanNumber);
  }

  // Formatar número para padrão brasileiro
  formatBrazilianPhone(phoneNumber: string): string {
    const cleanNumber = this.cleanPhoneNumber(phoneNumber);

    if (!this.validateBrazilianPhone(cleanNumber)) {
      throw new Error('Número de telefone inválido');
    }

    // Se não tiver o código do país, adicionar
    if (!cleanNumber.startsWith('55')) {
      return '55' + cleanNumber;
    }

    return cleanNumber;
  }

  // Buscar grupos por categoria ou filtro
  searchGroups(filter?: string, category?: string): Observable<Group[]> {
    let endpoint = 'wpp/groups/search';
    const params: string[] = [];

    if (filter) {
      params.push(`filter=${encodeURIComponent(filter)}`);
    }

    if (category) {
      params.push(`category=${encodeURIComponent(category)}`);
    }

    if (params.length > 0) {
      endpoint += '?' + params.join('&');
    }

    return this.apiService.get<{ data: Group[] }>(endpoint).pipe(
      map((response) => response.data || []),
      catchError((error) => {
        console.error('Erro ao buscar grupos:', error);
        return throwError(() => ({ error: 'Erro ao buscar grupos' }));
      }),
    );
  }
}
