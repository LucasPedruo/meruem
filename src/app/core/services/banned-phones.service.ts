import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BannedNumberDto, CreateBannedNumberDto } from '../models';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BannedPhonesService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  // Verificar se um número está banido
  checkBannedNumber(phoneNumber: string): Observable<BannedNumberDto | null> {
    const cleanNumber = this.cleanPhoneNumber(phoneNumber);

    return this.apiService
      .get<{ data: BannedNumberDto | null }>(`banned-phones/${cleanNumber}`)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error on check banned number:', error);
          return throwError(() => ({ error: 'Erro ao verificar número banido' }));
        }),
      );
  }

  // Obter todos os números banidos (requer autenticação)
  getBannedPhones(): Observable<BannedNumberDto[]> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => ({ error: 'Token de autenticação necessário' }));
    }

    return this.apiService.get<BannedNumberDto[]>('banned-phones', token).pipe(
      catchError((error) => {
        console.error('Ocorreu um erro ao buscar telefones banidos:', error);
        return throwError(() => ({ error: 'Erro ao buscar telefones banidos' }));
      }),
    );
  }

  // Criar novo número banido (requer autenticação)
  createBannedPhone(bannedPhoneData: CreateBannedNumberDto): Observable<BannedNumberDto> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => ({ error: 'Token de autenticação necessário' }));
    }

    // Limpar o número antes de enviar
    const cleanData = {
      ...bannedPhoneData,
      number: this.cleanPhoneNumber(bannedPhoneData.number),
    };

    return this.apiService.post<BannedNumberDto>('banned-phones', cleanData, token).pipe(
      catchError((error) => {
        console.error('Erro ao criar número banido:', error);
        return throwError(() => ({ error: 'Erro ao banir número' }));
      }),
    );
  }

  // Atualizar número banido (se a API suportar)
  updateBannedPhone(
    id: number,
    bannedPhoneData: Partial<CreateBannedNumberDto>,
  ): Observable<BannedNumberDto> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => ({ error: 'Token de autenticação necessário' }));
    }

    // Se estiver atualizando o número, limpá-lo
    const cleanData = bannedPhoneData.number
      ? { ...bannedPhoneData, number: this.cleanPhoneNumber(bannedPhoneData.number) }
      : bannedPhoneData;

    return this.apiService.put<BannedNumberDto>(`banned-phones/${id}`, cleanData, token).pipe(
      catchError((error) => {
        console.error('Erro ao atualizar número banido:', error);
        return throwError(() => ({ error: 'Erro ao atualizar número banido' }));
      }),
    );
  }

  // Remover número banido (se a API suportar)
  removeBannedPhone(id: number): Observable<void> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => ({ error: 'Token de autenticação necessário' }));
    }

    return this.apiService.delete<void>(`banned-phones/${id}`, token).pipe(
      catchError((error) => {
        console.error('Erro ao remover número banido:', error);
        return throwError(() => ({ error: 'Erro ao remover número banido' }));
      }),
    );
  }

  // Buscar números banidos por critério
  searchBannedPhones(searchTerm?: string, bannedBy?: string): Observable<BannedNumberDto[]> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => ({ error: 'Token de autenticação necessário' }));
    }

    let endpoint = 'banned-phones/search';
    const params: string[] = [];

    if (searchTerm) {
      params.push(`term=${encodeURIComponent(searchTerm)}`);
    }

    if (bannedBy) {
      params.push(`bannedBy=${encodeURIComponent(bannedBy)}`);
    }

    if (params.length > 0) {
      endpoint += '?' + params.join('&');
    }

    return this.apiService.get<BannedNumberDto[]>(endpoint, token).pipe(
      catchError((error) => {
        console.error('Erro ao buscar números banidos:', error);
        return throwError(() => ({ error: 'Erro ao buscar números banidos' }));
      }),
    );
  }

  // Verificar múltiplos números de uma vez
  checkMultipleBannedNumbers(
    phoneNumbers: string[],
  ): Observable<{ [key: string]: BannedNumberDto | null }> {
    const cleanNumbers = phoneNumbers.map((num) => this.cleanPhoneNumber(num));

    return this.apiService
      .post<{ [key: string]: BannedNumberDto | null }>('banned-phones/check-multiple', {
        numbers: cleanNumbers,
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao verificar múltiplos números:', error);
          return throwError(() => ({ error: 'Erro ao verificar números' }));
        }),
      );
  }

  // Limpar número de telefone (remover caracteres especiais)
  private cleanPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/[^a-zA-Z0-9]/g, '');
  }

  // Validar formato de número
  validatePhoneNumber(phoneNumber: string): boolean {
    const cleanNumber = this.cleanPhoneNumber(phoneNumber);
    // Validação básica: deve ter pelo menos 10 dígitos
    return cleanNumber.length >= 10 && cleanNumber.length <= 15;
  }

  // Formatar número para exibição
  formatPhoneNumber(phoneNumber: string): string {
    const cleanNumber = this.cleanPhoneNumber(phoneNumber);

    // Formato brasileiro: +55 (11) 99999-9999
    if (cleanNumber.length === 13 && cleanNumber.startsWith('55')) {
      const country = cleanNumber.substring(0, 2);
      const area = cleanNumber.substring(2, 4);
      const firstPart = cleanNumber.substring(4, 9);
      const secondPart = cleanNumber.substring(9);

      return `+${country} (${area}) ${firstPart}-${secondPart}`;
    }

    return phoneNumber; // Retorna original se não conseguir formatar
  }

  // Obter estatísticas de números banidos (se a API suportar)
  getBannedPhonesStatistics(): Observable<any> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => ({ error: 'Token de autenticação necessário' }));
    }

    return this.apiService.get<any>('banned-phones/statistics', token).pipe(
      catchError((error) => {
        console.error('Erro ao buscar estatísticas:', error);
        return throwError(() => ({ error: 'Erro ao buscar estatísticas' }));
      }),
    );
  }
}
