import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-custom-button-component',
  imports: [MaterialModule, CommonModule, RouterModule],
  standalone: true,
  styleUrl: './custom-button.scss',
  template: `
    @if (isRouterLink()) {
      <a
        [routerLink]="routerLink"
        [ngClass]="color"
        [attr.aria-describedby]="ariaDescribedBy || null"
        class="button"
      >
        <ng-content></ng-content>
      </a>
    } @else if (isExternalLink()) {
      <a
        [href]="href"
        [target]="target"
        [ngClass]="color"
        [attr.aria-describedby]="ariaDescribedBy || null"
        class="button"
      >
        <ng-content></ng-content>
      </a>
    } @else {
      <button
        [type]="type"
        [ngClass]="[color, sizes, customClass, state]"
        class="button"
        [disabled]="isDisabled()"
        [attr.aria-describedby]="ariaDescribedBy || null"
        (click)="onClick()"
      >
        @if (shouldShowIcon()) {
          <img [src]="iconSrc" [alt]="iconAlt" />
        } @else {
          {{ text }}
        }
        @if (showIcon) {
          <img src="link-external.svg" alt="Ícone link externo" />
        }
        @if (isLoading()) {
          <mat-spinner diameter="20"></mat-spinner>
        }
      </button>
    }
  `,
})
export class CustomButtonComponent {
  @Input() text = 'Botão';
  @Input() iconSrc?: string;
  @Input() iconAlt: string = '';
  @Input() ariaDescribedBy?: string;

  @Input() showIcon = false;
  @Input() label: string = 'Entrar no grupo';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'link' | 'primary' | 'secundary' | 'destaque' | 'warning' = 'link';
  @Input() sizes: 'small' | 'medium' | 'large' = 'small';
  @Input() state: 'loading' | 'normal' | 'disabled' = 'normal';
  @Input() customClass = '';

  //Link
  @Input() routerLink?: string; /* Link interno */
  @Input() href?: string; /* Link externo */
  @Input() target: '_self' | '_blank' = '_self';

  @Output() buttonClick = new EventEmitter<void>();

  // Computed methods for template logic
  isRouterLink(): boolean {
    return Boolean(this.routerLink);
  }

  isExternalLink(): boolean {
    return Boolean(this.href && !this.routerLink);
  }

  isDisabled(): boolean {
    return this.state === 'disabled' || this.state === 'loading';
  }

  shouldShowIcon(): boolean {
    return Boolean(this.iconSrc && this.state !== 'loading');
  }

  isLoading(): boolean {
    return this.state === 'loading';
  }

  onClick() {
    if (this.isDisabled()) {
      return;
    }

    this.buttonClick.emit();
  }
}
