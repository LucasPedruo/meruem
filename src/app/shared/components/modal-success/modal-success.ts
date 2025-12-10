import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-success.html',
  styleUrl: './modal-success.scss'
})
export class ModalSuccessComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Pronto!';
  @Input() message: string = 'Você foi adicionado ao grupo com sucesso.';
  @Input() primaryButtonText: string = 'Acessar';
  @Input() secondaryButtonText: string = 'Fechar';
  @Output() close = new EventEmitter<void>();
  @Output() primaryAction = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onPrimaryAction() {
    this.primaryAction.emit();
  }

  onBackdropClick() {
    this.onClose();
  }
}

