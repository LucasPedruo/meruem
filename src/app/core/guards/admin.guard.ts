import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user) => {
        // Verificar se está autenticado primeiro
        if (!user || !this.authService.isAuthenticated()) {
          localStorage.setItem('redirect_url', state.url);
          this.router.navigate(['/auth/login']);
          return false;
        }

        // Verificar permissões de admin
        const hasAdminPermission = this.authService.hasPermission('admin');

        if (!hasAdminPermission) {
          // Redirecionar para página de acesso negado ou home
          this.router.navigate(['/']);
          console.warn('Acesso negado: Permissões de admin necessárias');
          return false;
        }

        return true;
      }),
    );
  }
}
