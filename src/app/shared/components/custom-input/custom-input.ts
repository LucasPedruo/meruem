import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-custom-input',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, MatFormFieldModule],
  styleUrl: './custom-input.scss',
  template: `
    <div class="input-container">
      <label> {{ label }} </label>
      <mat-form-field>
        @if (type === 'textarea') {
          <textarea matInput [formControl]="control" placeholder="placeholder"></textarea>
        }
        @if (type !== 'textarea') {
          <input
            class="input"
            matInput
            [formControl]="control"
            [placeholder]="placeholder"
            [type]="type"
            [attr.minlength]="minlength"
            [attr.maxlength]="maxlength"
          />
        }
        @if (required === true) {
          <mat-hint> O campo {{ label }} é obrigatório</mat-hint>
        }

        <!-- Utilizado para informações adicionais sobre o campo oferecendo dicas para o usuário -->
        @if (hint) {
          <mat-hint>{{ hint }}</mat-hint>
        }
        <!-- Utilizado para mensagens de erro -->
        <mat-error> {{ errorMessage }} </mat-error>
      </mat-form-field>
    </div>
  `,
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'tel' | 'number' | 'textarea' = 'text';
  @Input() hint?: string;
  @Input() minlength?: number;
  @Input() maxlength?: number;

  @Input() required = false;
  @Input() disabled = false;

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) return null;

    if (this.control.errors['required']) {
      return ` O ${this.label} é obrigatório`;
    }

    if (this.control.errors['email']) {
      return ` O ${this.label} é inválido`;
    }

    if (this.control.errors['minlength']) {
      const min = this.control.errors['minlength'].requiredLength;
      return `O ${this.label} deve ter no mínimo ${min} caracteres`;
    }

    if (this.control.errors['maxlength']) {
      const max = this.control.errors['maxlength'].requiredLength;
      return `O ${this.label} deve ter no máximo ${max} caracteres`;
    }

    return null;
  }
}
