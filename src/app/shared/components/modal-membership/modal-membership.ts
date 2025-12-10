import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '../custom-modal/custom-modal';
import { OnChanges, SimpleChanges } from '@angular/core';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';
import { CountryCodeMaskDirective } from '../../directives/country-code-mask.directive';
import { LoadingValidationComponent } from '../loading-validation/loading-validation';
import { ModalSuccessComponent } from '../modal-success/modal-success';

@Component({
  selector: 'app-modal-membership',
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
  templateUrl: './modal-membership.html',
  styleUrl: './modal-membership.scss',
})
export class ModalMembershipComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() confirmButtonText: string = 'Verificar e entrar';
  @Input() groupName: string = 'Geral';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{
    nome: string;
    telefone: string;
    pais: string;
    grupo: string;
  }>();
  @Output() accessGroup = new EventEmitter<void>();

  isValidating: boolean = false;
  showSuccess: boolean = false;

  nomeControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  telefoneControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/),
  ]);
  paisControl = new FormControl('+55', [Validators.required, Validators.pattern(/^\+\d{1,4}$/)]);
  termosControl = new FormControl(false);

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

  onAccessGroup() {
    this.showSuccess = false;
    this.accessGroup.emit();
    this.onClose();
  }

  private resetForm() {
    this.nomeControl.setValue('');
    this.telefoneControl.setValue('');
    this.paisControl.setValue('+55');
    this.termosControl.setValue(false);
  }

  isFormValid(): boolean {
    const nomeValid = this.nomeControl.valid;
    const telefoneValid = this.telefoneControl.valid;
    const paisValid = this.paisControl.valid;
    const termosValid = this.termosControl.value === true;

    return nomeValid && telefoneValid && paisValid && termosValid;
  }

  getFieldErrorMessage(fieldControl: FormControl, fieldName: string): string {
    if (fieldControl.hasError('required')) {
      return `${fieldName} é obrigatório`;
    }
    if (fieldControl.hasError('minlength')) {
      return `${fieldName} deve ter pelo menos ${fieldControl.getError('minlength')?.requiredLength} caracteres`;
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

  onConfirm() {
    if (this.isFormValid()) {
      this.isValidating = true;

      const formData = {
        nome: this.nomeControl.value ? this.nomeControl.value.trim() : '',
        telefone: this.telefoneControl.value ? this.telefoneControl.value.trim() : '',
        pais: this.paisControl.value ? this.paisControl.value.trim() : '+55',
        grupo: this.groupName,
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
          this.confirm.emit(formData);
        }, 100);
      }, 2000);
    }
  }
}
