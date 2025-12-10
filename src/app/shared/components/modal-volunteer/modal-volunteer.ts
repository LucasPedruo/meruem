import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../custom-modal/custom-modal';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';
import { CountryCodeMaskDirective } from '../../directives/country-code-mask.directive';
import { LoadingValidationComponent } from '../loading-validation/loading-validation';
import { ModalSuccessComponent } from '../modal-success/modal-success';

@Component({
  selector: 'app-modal-volunteer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    ModalComponent,
    PhoneMaskDirective,
    CountryCodeMaskDirective,
    LoadingValidationComponent,
    ModalSuccessComponent,
  ],
  templateUrl: './modal-volunteer.html',
  styleUrl: './modal-volunteer.scss',
})
export class ModalVolunteerComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<{
    nome: string;
    email: string;
    linkedin: string;
    telefone: string;
    pais: string;
    aceitartermos: boolean;
  }>();

  isValidating: boolean = false;
  showSuccess: boolean = false;

  nomeControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  linkedinControl = new FormControl('', [Validators.required]);
  telefoneControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/),
  ]);
  paisControl = new FormControl('+55', [Validators.required, Validators.pattern(/^\+\d{1,4}$/)]);
  termosControl = new FormControl(false, [Validators.requiredTrue]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && !changes['isOpen'].currentValue) {
      this.resetForm();
      this.isValidating = false;
      this.showSuccess = false;
    }
  }

  onClose() {
    this.resetForm();
    this.isValidating = false;
    this.showSuccess = false;
    this.close.emit();
  }

  onSuccessClose() {
    this.showSuccess = false;
    this.onClose();
  }

  private resetForm() {
    this.nomeControl.setValue('');
    this.emailControl.setValue('');
    this.linkedinControl.setValue('');
    this.telefoneControl.setValue('');
    this.paisControl.setValue('+55');
    this.termosControl.setValue(false);
  }

  isFormValid(): boolean {
    return (
      this.nomeControl.valid &&
      this.emailControl.valid &&
      this.linkedinControl.valid &&
      this.telefoneControl.valid &&
      this.paisControl.valid &&
      this.termosControl.valid
    );
  }

  getFieldErrorMessage(fieldControl: FormControl, fieldName: string): string {
    if (fieldControl.hasError('required')) {
      return `${fieldName} é obrigatório`;
    }
    if (fieldControl.hasError('minlength')) {
      return `${fieldName} deve ter pelo menos ${fieldControl.getError('minlength')?.requiredLength} caracteres`;
    }
    if (fieldControl.hasError('email')) {
      return 'Formato de e-mail inválido';
    }
    if (fieldControl.hasError('pattern')) {
      if (fieldName === 'Telefone') {
        return 'Formato inválido. Use: (XX) XXXXX-XXXX';
      }
      if (fieldName === 'País') {
        return 'Formato inválido. Use: +XX';
      }
      return `${fieldName} tem formato inválido`;
    }
    return '';
  }

  isFieldInvalid(fieldControl: FormControl): boolean {
    return fieldControl.invalid && (fieldControl.dirty || fieldControl.touched);
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.isValidating = true;

      const formData = {
        nome: this.nomeControl.value ? this.nomeControl.value.trim() : '',
        email: this.emailControl.value ? this.emailControl.value.trim() : '',
        linkedin: this.linkedinControl.value ? this.linkedinControl.value.trim() : '',
        telefone: this.telefoneControl.value ? this.telefoneControl.value.trim() : '',
        pais: this.paisControl.value ? this.paisControl.value.trim() : '+55',
        aceitartermos: this.termosControl.value === true,
      };

      // Simula validação (2 segundos)
      setTimeout(() => {
        // Fecha o modal principal e mostra o modal de sucesso
        this.isOpen = false;
        this.isValidating = false;
        this.resetForm();

        // Pequeno delay para suavizar a transição
        setTimeout(() => {
          this.showSuccess = true;
          this.submit.emit(formData);
        }, 100);
      }, 2000);
    }
  }
}
