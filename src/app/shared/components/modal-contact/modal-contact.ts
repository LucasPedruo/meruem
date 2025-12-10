import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../custom-modal/custom-modal';
import { LoadingValidationComponent } from '../loading-validation/loading-validation';

@Component({
  selector: 'app-modal-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    ModalComponent,
    LoadingValidationComponent,
  ],
  templateUrl: './modal-contact.html',
  styleUrl: './modal-contact.scss',
})
export class ModalContactComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<{
    nome: string;
    email: string;
    assunto: string;
    mensagem: string;
    aceitartermos: boolean;
  }>();

  isValidating: boolean = false;

  nomeControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  assuntoControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  mensagemControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  termosControl = new FormControl(false, [Validators.requiredTrue]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && !changes['isOpen'].currentValue) {
      this.resetForm();
      this.isValidating = false;
    }
  }

  onClose() {
    this.resetForm();
    this.isValidating = false;
    this.close.emit();
  }

  private resetForm() {
    this.nomeControl.setValue('');
    this.emailControl.setValue('');
    this.assuntoControl.setValue('');
    this.mensagemControl.setValue('');
    this.termosControl.setValue(false);
  }

  isFormValid(): boolean {
    return (
      this.nomeControl.valid &&
      this.emailControl.valid &&
      this.assuntoControl.valid &&
      this.mensagemControl.valid &&
      this.termosControl.valid
    );
  }

  getFieldErrorMessage(fieldControl: FormControl, fieldName: string): string {
    if (fieldControl.hasError('required')) {
      return `${fieldName} é obrigatório`;
    }
    if (fieldControl.hasError('minlength')) {
      const requiredLength = fieldControl.getError('minlength')?.requiredLength;
      return `${fieldName} deve ter pelo menos ${requiredLength} caracteres`;
    }
    if (fieldControl.hasError('email')) {
      return 'Formato de e-mail inválido';
    }
    return '';
  }

  isFieldInvalid(fieldControl: FormControl): boolean {
    return fieldControl.invalid && (fieldControl.dirty || fieldControl.touched);
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.isValidating = true;

      // Simula validação (2 segundos)
      setTimeout(() => {
        this.isValidating = false;
        this.submit.emit({
          nome: this.nomeControl.value ? this.nomeControl.value.trim() : '',
          email: this.emailControl.value ? this.emailControl.value.trim() : '',
          assunto: this.assuntoControl.value ? this.assuntoControl.value.trim() : '',
          mensagem: this.mensagemControl.value ? this.mensagemControl.value.trim() : '',
          aceitartermos: this.termosControl.value === true,
        });
        this.resetForm();
      }, 2000);
    }
  }
}
