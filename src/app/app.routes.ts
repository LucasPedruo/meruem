import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'hackathon',
    loadComponent: () =>
      import('./features/hackathon/hackathon-redirect.component').then(
        (m) => m.HackathonRedirectComponent,
      ),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'sobre',
    loadComponent: () => import('./features/sobre/sobre.component').then((m) => m.SobreComponent),
  },
  {
    path: 'grupos',
    loadComponent: () =>
      import('./features/grupos/grupos.component').then((m) => m.GruposComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
