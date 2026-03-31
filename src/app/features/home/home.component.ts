import { Component } from '@angular/core';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  showModal: boolean = false;
  showInstitutionalModal = false;
  activeInstitutionalKey: 'eventos' | 'sobre' | 'equipe' | 'parceiros' = 'sobre';
  appTitle = environment.appTitle;
  isProduction = environment.production;
  groups = () => _fixeGroups().filter((group) => group.text !== 'Geral 2');
  institutionalContent = {
    eventos: {
      title: 'Eventos',
      description:
        'A FullDev promove encontros, desafios e trocas práticas para conectar a comunidade em torno de aprendizado e colaboração.',
      items: [
        'Workshops e encontros para compartilhar conhecimento.',
        'Hackathons e dinâmicas para resolver problemas em grupo.',
        'Ações especiais da comunidade para estimular networking.',
      ],
    },
    sobre: {
      title: 'Sobre nós',
      description:
        'A FullDev nasceu para criar um espaço acessível de troca entre pessoas que estudam, trabalham ou querem crescer em tecnologia.',
      items: [
        'Comunidade focada em conexão, suporte e evolução contínua.',
        'Ambiente para discutir carreira, estudo e projetos reais.',
        'Iniciativas pensadas para fortalecer o senso de pertencimento.',
      ],
    },
    equipe: {
      title: 'Equipe',
      description:
        'Nossa equipe organiza a comunidade, cuida das iniciativas e mantém os espaços ativos para que as conexões aconteçam com consistência.',
      items: [
        'Pessoas responsáveis por curadoria, organização e suporte.',
        'Atuação colaborativa para manter grupos e ações funcionando.',
        'Foco em acolhimento, qualidade das interações e continuidade.',
      ],
    },
    parceiros: {
      title: 'Parceiros',
      description:
        'A FullDev busca conexões com empresas, comunidades e iniciativas que compartilham o interesse em ampliar oportunidades em tecnologia.',
      items: [
        'Parcerias para eventos, ações educacionais e divulgação.',
        'Apoio a iniciativas que gerem valor real para a comunidade.',
        'Construção de pontes entre talentos, conteúdo e mercado.',
      ],
    },
  } as const;

  constructor() {}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openInstitutionalModal(key: 'eventos' | 'sobre' | 'equipe' | 'parceiros') {
    this.activeInstitutionalKey = key;
    this.showInstitutionalModal = true;
  }

  closeInstitutionalModal() {
    this.showInstitutionalModal = false;
  }

  activeInstitutionalContent() {
    return this.institutionalContent[this.activeInstitutionalKey];
  }
}
