import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, NavMenuComponent } from '../shared/components';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent, FooterComponent],
  template: `
    <div class="layout">
      <app-nav-menu-component />
      <main class="content">
        <router-outlet />
      </main>
      <app-footer-component />
    </div>
  `,
  styles: [
    `
      .layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .content {
        flex: 1;
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }
    `,
  ],
})
export class MainLayoutComponent {}
