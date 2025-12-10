import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button';
import { FooterComponent } from '../../shared/components/footer/footer-component';
import { ModalContactComponent } from '../../shared/components/modal-contact/modal-contact';
import { NavMenuComponent } from '../../shared/components/nav-menu/nav-menu-component';
import { SocialComponent } from '../../shared/components/social-component/social-component';

@Component({
  selector: 'app-sobre-component',
  imports: [
    CustomButtonComponent,
    FooterComponent,
    NavMenuComponent,
    SocialComponent,
    ModalContactComponent,
  ],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.scss',
})
export class SobreComponent {
  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onContactSubmit(_payload: {
    nome: string;
    email: string;
    assunto: string;
    mensagem: string;
    aceitartermos: boolean;
  }) {
    this.toggleModal();
  }
}
