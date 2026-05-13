import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'home',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'sobre',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'newletter',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'newsletter',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
