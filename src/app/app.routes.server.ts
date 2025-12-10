import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'sobre',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contato',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'voluntario',
    renderMode: RenderMode.Prerender,
  },
];
