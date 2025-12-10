import { Injectable } from '@angular/core';

interface RateLimitEntry {
  count: number;
  lastRequest: number;
}

@Injectable({
  providedIn: 'root',
})
export class RateLimitService {
  private store: Map<string, RateLimitEntry> = new Map();
  private readonly WINDOW_MS = 60 * 1000; // 1 minuto
  private readonly MAX_REQUESTS = 30; // 30 requisições por minuto
  private cleanupInterval?: number;

  constructor() {
    // Limpar entradas antigas a cada 2 minutos
    this.cleanupInterval = window.setInterval(() => {
      this.clearOldEntries();
    }, this.WINDOW_MS * 2);
  }

  // Verificar se uma chave (URL/endpoint) está limitada por rate limit
  isRateLimited(key: string): boolean {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry) {
      this.store.set(key, { count: 1, lastRequest: now });
      return false;
    }

    // Se passou o tempo limite, resetar contador
    if (now - entry.lastRequest > this.WINDOW_MS) {
      this.store.set(key, { count: 1, lastRequest: now });
      return false;
    }

    // Se excedeu o limite
    if (entry.count >= this.MAX_REQUESTS) {
      return true;
    }

    // Incrementar contador
    entry.count += 1;
    entry.lastRequest = now;
    return false;
  }

  // Obter informações sobre o rate limit para uma chave
  getRateLimitInfo(key: string): { remaining: number; resetTime: number } {
    const entry = this.store.get(key);

    if (!entry) {
      return { remaining: this.MAX_REQUESTS, resetTime: Date.now() + this.WINDOW_MS };
    }

    const now = Date.now();

    // Se passou o tempo limite
    if (now - entry.lastRequest > this.WINDOW_MS) {
      return { remaining: this.MAX_REQUESTS, resetTime: now + this.WINDOW_MS };
    }

    return {
      remaining: Math.max(0, this.MAX_REQUESTS - entry.count),
      resetTime: entry.lastRequest + this.WINDOW_MS,
    };
  }

  // Limpar entradas antigas
  private clearOldEntries(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.store.forEach((entry, key) => {
      if (now - entry.lastRequest > this.WINDOW_MS * 2) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => this.store.delete(key));
  }

  // Limpar todas as entradas (útil para testes)
  clear(): void {
    this.store.clear();
  }

  // Destruir o service (limpar intervalo)
  ngOnDestroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  // Configurar limites personalizados para endpoints específicos
  setCustomLimits(key: string, maxRequests: number, windowMs: number): void {
    // TODO: Implementar limites personalizados por endpoint
    console.warn(
      `Limites personalizados para ${key}: ${maxRequests} req/${windowMs}ms ainda não implementados`,
    );
  }

  // Obter estatísticas de uso
  getUsageStatistics(): { totalKeys: number; activeKeys: number; totalRequests: number } {
    const now = Date.now();
    let totalRequests = 0;
    let activeKeys = 0;

    this.store.forEach((entry) => {
      totalRequests += entry.count;
      if (now - entry.lastRequest <= this.WINDOW_MS) {
        activeKeys++;
      }
    });

    return {
      totalKeys: this.store.size,
      activeKeys,
      totalRequests,
    };
  }
}
