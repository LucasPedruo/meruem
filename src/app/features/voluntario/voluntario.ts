import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer-component';
import { ModalVolunteerComponent } from '../../shared/components/modal-volunteer/modal-volunteer';
import { NavMenuComponent } from '../../shared/components/nav-menu/nav-menu-component';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button';

@Component({
  selector: 'app-voluntario',
  imports: [NavMenuComponent, FooterComponent, ModalVolunteerComponent, CustomButtonComponent],
  templateUrl: './voluntario.html',
  styleUrl: './voluntario.component.scss',
})
export class VoluntarioComponent {
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onFormSubmit(_formData: {
    nome: string;
    email: string;
    linkedin: string;
    telefone: string;
    pais: string;
    aceitartermos: boolean;
  }) {
    // Implementar a lógica de envio dos dados (API, etc)
  }
}
