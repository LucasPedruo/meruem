import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AppConfig {
  [key: string]: any;
  apiUrl: string;
  appTitle: string;
  version: string;
  features: {
    enableLogging: boolean;
    enableRateLimit: boolean;
    enableRetry: boolean;
    maxRetries: number;
    retryDelay: number;
  };
  theme: {
    primaryColor: string;
    darkMode: boolean;
  };
  whatsapp: {
    maxGroupMembers: number;
    inviteRetries: number;
    inviteDelay: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configSubject = new BehaviorSubject<AppConfig>(this.getDefaultConfig());
  public config$ = this.configSubject.asObservable();

  constructor() {
    this.loadConfig();
  }

  private getDefaultConfig(): AppConfig {
    return {
      apiUrl: environment.apiUrl || 'http://localhost:3000/api',
      appTitle: environment.appTitle || 'Meruem',
      version: '1.0.0',
      features: {
        enableLogging: !environment.production,
        enableRateLimit: true,
        enableRetry: true,
        maxRetries: 3,
        retryDelay: 1000,
      },
      theme: {
        primaryColor: '#ff5722',
        darkMode: false,
      },
      whatsapp: {
        maxGroupMembers: 1024,
        inviteRetries: 3,
        inviteDelay: 1000,
      },
    };
  }

  private loadConfig(): void {
    // Tentar carregar configurações do localStorage
    const savedConfig = localStorage.getItem('app_config');

    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        const mergedConfig = { ...this.getDefaultConfig(), ...parsedConfig };
        this.configSubject.next(mergedConfig);
      } catch {
        console.warn('Configuração salva inválida, usando padrão');
      }
    }
  }

  // Obter configuração atual
  getConfig(): AppConfig {
    return this.configSubject.value;
  }

  // Obter configuração como Observable
  getConfig$(): Observable<AppConfig> {
    return this.config$;
  }

  // Atualizar configuração
  updateConfig(partialConfig: Partial<AppConfig>): void {
    const currentConfig = this.configSubject.value;
    const newConfig = this.mergeDeep(currentConfig, partialConfig);

    this.configSubject.next(newConfig);
    this.saveConfig(newConfig);
  }

  // Obter valor específico da configuração
  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.configSubject.value[key];
  }

  // Obter valor aninhado da configuração
  getNestedValue(path: string): any {
    return path.split('.').reduce((obj: any, key: string) => obj?.[key], this.configSubject.value);
  }

  // Resetar para configuração padrão
  resetToDefault(): void {
    const defaultConfig = this.getDefaultConfig();
    this.configSubject.next(defaultConfig);
    this.saveConfig(defaultConfig);
  }

  // Salvar configuração no localStorage
  private saveConfig(config: AppConfig): void {
    try {
      localStorage.setItem('app_config', JSON.stringify(config));
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
    }
  }

  // Merge profundo de objetos
  private mergeDeep(target: any, source: any): any {
    const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);

    if (!isObject(target) || !isObject(source)) {
      return source;
    }

    const result = { ...target };

    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (isObject(result[key])) {
          result[key] = this.mergeDeep(result[key], source[key]);
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    });

    return result;
  }

  // Métodos de conveniência para configurações específicas

  // API
  getApiUrl(): string {
    return this.get('apiUrl');
  }

  setApiUrl(url: string): void {
    this.updateConfig({ apiUrl: url });
  }

  // Features
  isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
    return this.get('features')[feature] as boolean;
  }

  toggleFeature(feature: keyof AppConfig['features']): void {
    const currentValue = this.get('features')[feature];
    this.updateConfig({
      features: {
        ...this.get('features'),
        [feature]: !currentValue,
      },
    });
  }

  // Theme
  isDarkMode(): boolean {
    return this.get('theme').darkMode;
  }

  toggleDarkMode(): void {
    const currentMode = this.isDarkMode();
    this.updateConfig({
      theme: {
        ...this.get('theme'),
        darkMode: !currentMode,
      },
    });
  }

  getPrimaryColor(): string {
    return this.get('theme').primaryColor;
  }

  setPrimaryColor(color: string): void {
    this.updateConfig({
      theme: {
        ...this.get('theme'),
        primaryColor: color,
      },
    });
  }

  // WhatsApp
  getWhatsAppConfig(): AppConfig['whatsapp'] {
    return this.get('whatsapp');
  }

  setWhatsAppConfig(config: Partial<AppConfig['whatsapp']>): void {
    this.updateConfig({
      whatsapp: {
        ...this.get('whatsapp'),
        ...config,
      },
    });
  }

  // Validar configuração
  validateConfig(config: Partial<AppConfig>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (config.apiUrl && !this.isValidUrl(config.apiUrl)) {
      errors.push('URL da API inválida');
    }

    if (
      config.features?.maxRetries &&
      (config.features.maxRetries < 1 || config.features.maxRetries > 10)
    ) {
      errors.push('Número máximo de tentativas deve estar entre 1 e 10');
    }

    if (config.whatsapp?.maxGroupMembers && config.whatsapp.maxGroupMembers < 1) {
      errors.push('Número máximo de membros do grupo deve ser positivo');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Exportar configuração atual
  exportConfig(): string {
    return JSON.stringify(this.getConfig(), null, 2);
  }

  // Importar configuração
  importConfig(configJson: string): { success: boolean; error?: string } {
    try {
      const config = JSON.parse(configJson);
      const validation = this.validateConfig(config);

      if (!validation.isValid) {
        return { success: false, error: validation.errors.join(', ') };
      }

      this.updateConfig(config);
      return { success: true };
    } catch {
      return { success: false, error: 'JSON inválido' };
    }
  }
}
