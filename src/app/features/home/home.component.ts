import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button';
import { ModalComponent } from '../../shared/components/custom-modal/custom-modal';
import { FooterComponent } from '../../shared/components/footer/footer-component';
import { SocialComponent } from '../../shared/components/social-component/social-component';
import { GruposComponent } from '../grupos/grupos.component';
import { _fixeGroups } from '../grupos/group.model';

@Component({
  selector: 'app-home-component',
  imports: [
    GruposComponent,
    CustomButtonComponent,
    FooterComponent,
    ModalComponent,
    SocialComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  showModal: boolean = false;
  appTitle = environment.appTitle;
  isProduction = environment.production;

  constructor() {
    if (environment.production) {
      console.warn('🏠 Home component em produção');
    } else {
      console.warn('🏠 Home component em desenvolvimento');
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  groups = _fixeGroups
}
