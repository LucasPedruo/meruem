import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button';
import { ModalMembershipComponent } from '../../shared/components/modal-membership/modal-membership';
@Component({
  selector: 'app-grupos-component',
  imports: [CommonModule, CustomButtonComponent, ModalMembershipComponent],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.scss',
  standalone: true
})
export class GruposComponent {
  private readonly queensStorageKey = 'queens-of-deploy-confirmed';

  @Input() text = 'Grupos';
  @Input() description = 'Grupo no WhatsApp';
  @Input() buttonText = 'Entrar';
  @Input() src: string = 'fulldev.png';
  @Input() parentType: 'home' | 'modal' = 'home';
  @Input() showIcon = false;
  @Input() groupName: string = '';
  @Input() linkGroup: string = '';
  @Input() buttonState: 'loading' | 'normal' | 'disabled' = 'normal';
  @Output() queensAccessRequested = new EventEmitter<string>();
  @Output() blockedAccessRequested = new EventEmitter<string>();

  isMembershipModalOpen = false;

  private isQueensGroup() {
    return this.text === 'Queens of Deploy';
  }

  private hasQueensConfirmation() {
    return typeof window !== 'undefined' && window.localStorage.getItem(this.queensStorageKey) === 'true';
  }

  onGroupButtonClick() {
    if (this.buttonState === 'disabled') {
      this.blockedAccessRequested.emit(this.text);
      return;
    }

    this.goToGroupLink();
  }

  private goToGroupLink() {
    if (this.isQueensGroup() && !this.hasQueensConfirmation()) {
      this.queensAccessRequested.emit(this.linkGroup);
      return;
    }

    window.open(`https://chat.whatsapp.com/${this.linkGroup}?mode=hqrt1`, '_blank');
  }

  openMembershipModal() {
    this.isMembershipModalOpen = true;
  }

  closeMembershipModal() {
    this.isMembershipModalOpen = false;
  }

  onMembershipConfirmed(_data: { nome: string; telefone: string; pais: string; grupo: string }) {
  }

  onAccessGroup() {
    this.closeMembershipModal();
  }


}
