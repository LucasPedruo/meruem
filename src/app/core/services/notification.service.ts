import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private defaultDuration = 5000; // 5 segundos

  // Mostrar notificação de sucesso
  success(title: string, message: string, options?: Partial<Notification>): string {
    return this.show({
      type: 'success',
      title,
      message,
      ...options,
    });
  }

  // Mostrar notificação de erro
  error(title: string, message: string, options?: Partial<Notification>): string {
    return this.show({
      type: 'error',
      title,
      message,
      persistent: true, // Erros são persistentes por padrão
      ...options,
    });
  }

  // Mostrar notificação de aviso
  warning(title: string, message: string, options?: Partial<Notification>): string {
    return this.show({
      type: 'warning',
      title,
      message,
      ...options,
    });
  }

  // Mostrar notificação de informação
  info(title: string, message: string, options?: Partial<Notification>): string {
    return this.show({
      type: 'info',
      title,
      message,
      ...options,
    });
  }

  // Mostrar notificação genérica
  show(notification: Omit<Notification, 'id'>): string {
    const id = this.generateId();
    const fullNotification: Notification = {
      id,
      duration: notification.persistent ? undefined : notification.duration || this.defaultDuration,
      ...notification,
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, fullNotification]);

    // Auto-remover após duração especificada
    if (fullNotification.duration) {
      setTimeout(() => {
        this.remove(id);
      }, fullNotification.duration);
    }

    return id;
  }

  // Remover notificação por ID
  remove(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter((n) => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);
  }

  // Remover todas as notificações
  clear(): void {
    this.notificationsSubject.next([]);
  }

  // Remover notificações por tipo
  clearByType(type: Notification['type']): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter((n) => n.type !== type);
    this.notificationsSubject.next(filteredNotifications);
  }

  // Obter todas as notificações
  getAll(): Observable<Notification[]> {
    return this.notifications$;
  }

  // Obter notificação por ID
  getById(id: string): Notification | undefined {
    return this.notificationsSubject.value.find((n) => n.id === id);
  }

  // Contar notificações por tipo
  countByType(type: Notification['type']): number {
    return this.notificationsSubject.value.filter((n) => n.type === type).length;
  }

  // Verificar se há notificações
  hasNotifications(): boolean {
    return this.notificationsSubject.value.length > 0;
  }

  // Atualizar notificação existente
  update(id: string, updates: Partial<Notification>): void {
    const currentNotifications = this.notificationsSubject.value;
    const notificationIndex = currentNotifications.findIndex((n) => n.id === id);

    if (notificationIndex !== -1) {
      const updatedNotifications = [...currentNotifications];
      updatedNotifications[notificationIndex] = {
        ...updatedNotifications[notificationIndex],
        ...updates,
        id, // Manter o ID original
      };
      this.notificationsSubject.next(updatedNotifications);
    }
  }

  // Métodos de conveniência para casos comuns

  // API responses
  apiError(error: any): string {
    const title = 'Erro na API';
    const message = error?.error?.message || error?.message || 'Ocorreu um erro inesperado';

    return this.error(title, message);
  }

  apiSuccess(message: string = 'Operação realizada com sucesso'): string {
    return this.success('Sucesso', message);
  }

  // Network errors
  networkError(): string {
    return this.error('Erro de Conexão', 'Verifique sua conexão com a internet e tente novamente');
  }

  // Validation errors
  validationError(errors: string[]): string {
    const message =
      errors.length === 1
        ? errors[0]
        : `Múltiplos erros:\n${errors.map((e) => `• ${e}`).join('\n')}`;

    return this.warning('Erro de Validação', message);
  }

  // Loading notifications
  loading(message: string = 'Processando...'): string {
    return this.show({
      type: 'info',
      title: 'Aguarde',
      message,
      persistent: true,
    });
  }

  // Confirmation with actions
  confirm(title: string, message: string, onConfirm: () => void, onCancel?: () => void): string {
    return this.show({
      type: 'warning',
      title,
      message,
      persistent: true,
      actions: [
        {
          label: 'Confirmar',
          action: () => {
            onConfirm();
            // A notificação será removida automaticamente
          },
          style: 'primary',
        },
        {
          label: 'Cancelar',
          action: () => {
            if (onCancel) onCancel();
            // A notificação será removida automaticamente
          },
          style: 'secondary',
        },
      ],
    });
  }

  // Gerar ID único
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // Configurar duração padrão
  setDefaultDuration(duration: number): void {
    this.defaultDuration = duration;
  }

  // Obter duração padrão
  getDefaultDuration(): number {
    return this.defaultDuration;
  }
}
