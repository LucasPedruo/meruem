import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  private readonly sanitizer = inject(DomSanitizer);

  readonly emptyInstitutionalItems: readonly string[] = [];
  readonly headerLogoDefault = 'fulldev.png';
  readonly headerLogoMascot = 'mascote.png';
  readonly headerFlipDurationMs = 200;
  readonly newsletterSubscribeUrl =
    'https://substack.com/@fulldev?utm_campaign=profile&utm_medium=profile-page';
  readonly newsletterEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://fulldev.substack.com/embed',
  );
  readonly vscodeThemeUrl = 'https://marketplace.visualstudio.com/items?itemName=FullDev.beru-theme';
  showModal: boolean = false;
  showInstitutionalModal = false;
  showVscodeThemeModal = false;
  isHeaderFlipping = false;
  isHeaderMascotVisible = false;
  headerLightVariant: 'a' | 'b' = 'a';
  headerFlipDirection: 'forward' | 'backward' = 'forward';
  activeInstitutionalKey: 'eventos' | 'sobre' | 'equipe' | 'parceiros' | 'loja' | 'school' = 'sobre';
  appTitle = environment.appTitle;
  isProduction = environment.production;
  modalGroups = () => _fixeGroups().filter((group) => group.text !== 'Games');
  teamSections = [
    {
      title: 'Conselho',
      members: [
        {
          name: 'Lucas Pedro',
          stack: 'Fundador da FullDev',
          image: 'equipe/lucas.jpg',
          linkedin: 'https://www.linkedin.com/in/lucaspedruo/',
        },
        {
          name: 'Matheus Braz',
          stack: 'Vice diretor',
          image: 'equipe/math.jpg',
          linkedin: 'https://www.linkedin.com/in/matheus-braz-gs/',
        },
        {
          name: 'Lyssa Oliveira',
          stack: 'Fundadora do Queens',
          image: 'equipe/lyssa.jpeg',
          linkedin: 'https://www.linkedin.com/in/lyssa-lima-brito/',
        },
        {
          name: 'Giovanna Bertoletti',
          stack: 'Vice diretora do Queens',
          image: 'equipe/gio.jpg',
          linkedin: 'https://www.linkedin.com/in/giovanna-bertoletti/',
        },
        {
          name: 'Gabriela Mariano',
          stack: 'Fundadora do Rainbowstack',
          image: 'equipe/gabu.jpg',
          linkedin: 'https://www.linkedin.com/in/gabi-mariano/',
        },
        {
          name: 'João Victor',
          stack: 'Fundador da FullDev Games',
          image: 'equipe/joao.jpg',
          linkedin: 'https://www.linkedin.com/in/jvemmanuell/',
        },
      ],
    },
    {
      title: 'Moderadores',
      members: [
        {
          name: 'Daniel Mesquita',
          stack: 'Moderador na FullDev',
          image: 'equipe/Daniel.jpg',
          linkedin: 'https://www.linkedin.com/in/danielgmesquita',
        },
        {
          name: 'José Henrike',
          stack: 'Moderador na FullDev',
          image: 'equipe/José Henrike.jpg',
          linkedin: 'https://www.linkedin.com/in/josehenrike/',
        },
        {
          name: 'Pablo Henrique',
          stack: 'Moderador na FullDev',
          image: 'equipe/pablo.jpg',
          linkedin: 'https://www.linkedin.com/in/pablo-henrique-245709207/',
        },
        {
          name: 'Fernando Valença',
          stack: 'Desenvolvedor na FullDev',
          image: 'equipe/fernando.jpg',
          linkedin: 'http://www.linkedin.com.br/in/fernando-valenca',
        },
        {
          name: 'Hernando Junior',
          stack: 'Desenvolvedor na FullDev',
          image: 'equipe/Hernando.jpg',
          linkedin: 'https://www.linkedin.com/in/hernandojunior',
        },
        {
          name: 'Luciana Galdino',
          stack: 'Desenvolvedor na FullDev',
          image: 'equipe/Luciana.jpg',
          linkedin:
            'https://www.linkedin.com/in/lucianagaldino-?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
        },
        {
          name: 'Sofia Vaz',
          stack: 'Desenvolvedor na FullDev',
          image: 'equipe/Sofia.jpg',
          linkedin: 'https://www.linkedin.com/in/sofia-vazxavier',
        },
        {
          name: 'Ana Carolina',
          stack: 'Moderador no Queens',
          image: 'equipe/ana-carolina.jpg',
          linkedin: 'https://www.linkedin.com/in/carolinamerloti',
        },
        {
          name: 'Dalila Castro',
          stack: 'Moderador no Queens',
          image: 'equipe/dalila.jpg',
          linkedin: 'https://www.linkedin.com/in/dalila-castro-moresco/',
        },
        {
          name: 'Lorenna Luize',
          stack: 'Moderador no Queens',
          image: 'equipe/lorena.jpg',
          linkedin: 'https://www.linkedin.com/in/lorenna-dias/',
        },
        {
          name: 'Maria Clara',
          stack: 'Moderador no Queens',
          image: 'equipe/maria-clara.jpg',
          linkedin: 'https://www.linkedin.com/in/maria-clara-silva374',
        },
        {
          name: 'Victoria Mariucha',
          stack: 'Moderador no Queens',
          image: 'equipe/Vitoria.jpg',
          linkedin: 'https://www.linkedin.com/in/victoria-mariucha/',
        },
      ],
    },
  ] as const;
  partnerCards = [
    {
      name: 'Friends of Figma',
      stack: 'Comunidade oficial do Figma no Rio de Janeiro.',
      image: 'fofrio_logo.jpg',
      linkedin: 'https://www.linkedin.com/company/fofrio',
    },
  ] as const;
  eventCards = [
    {
      name: 'HandsOn Rio',
      stack: 'Em fase de organização',
      image: 'fulldev.png',
      buttonText: '',
      state: 'loading' as const,
    },
    {
      name: 'FullDev Open Source',
      stack: 'Em fase de organização',
      image: 'fulldev.png',
      buttonText: '',
      state: 'loading' as const,
    },
  ] as const;
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
      description: '',
      items: [
        'A história da FullDev começa com algo simples, quase banal, mas que carregava o potencial de transformar vidas.',
        'Em 2024, durante um curso de tecnologia do Santander, Lucas Pedro sentiu a necessidade de ter com quem conversar sobre programação.',
        'Não tinha amigos na área, nem um espaço seguro para trocar experiências.',
        'Foi então que ele criou um grupo no WhatsApp, chamado “Coders”, apenas como um pretexto para se aproximar de outras pessoas com interesses semelhantes.',
        'A intenção inicial era modesta: manter contato com colegas do curso e, quem sabe, trocar ideias de vez em quando.',
        'Quando o curso terminou, ao invés de deixar o grupo morrer, Lucas propôs a alguns membros que o mantivessem ativo.',
        'E foi nesse momento que veio o estalo: “Por que não transformar isso numa comunidade de verdade?”',
        'O início foi tímido: pouco mais de 100 pessoas, e a interação era mínima.',
        'Mas Lucas percebeu que, para algo realmente florescer, precisaria ser colaborativo.',
        'Ele começou a convidar mais pessoas para ajudar na gestão, criar iniciativas e gerar um senso de pertencimento.',
        'Aos poucos, o grupo ganhou vida: hackathons, indicações de vagas, bate-papos técnicos e conversas descontraídas começaram a surgir de forma natural.',
        'Pessoas que antes não se conheciam passaram a se ajudar, e histórias inspiradoras começaram a aparecer.',
      ],
    },
    equipe: {
      title: 'Equipe',
      description: '',
      items: [],
    },
    parceiros: {
      title: 'Parceiros',
      description:
        'A FullDev busca conexões com empresas, comunidades e iniciativas que compartilham o interesse em ampliar oportunidades em tecnologia.',
      items: [
        'Parcerias para eventos, ações educacionais e divulgação.',
        'Apoio a iniciativas que gerem valor real para a comunidade.',
        'Construção de pontes entre talentos, conteúdo e mercado.',
        'Para parcerias, entre em contato em lucasdearaujopedrolap@gmail.com.',
      ],
    },
    loja: {
      title: 'Loja',
      description: 'Em breve teremos uma loja com produtos exclusivos da FullDev!',
    },
    school: {
      title: 'School',
      description: 'Em breve teremos uma school com cursos exclusivos da FullDev!',
    }

  } as const;

  constructor() {}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openVscodeThemeModal() {
    this.showVscodeThemeModal = true;
  }

  closeVscodeThemeModal() {
    this.showVscodeThemeModal = false;
  }

  openInstitutionalModal(key: 'eventos' | 'sobre' | 'equipe' | 'parceiros' | 'loja' | 'school') {
    this.activeInstitutionalKey = key;
    this.showInstitutionalModal = true;
  }

  closeInstitutionalModal() {
    this.showInstitutionalModal = false;
  }

  currentHeaderImage() {
    return this.isHeaderMascotVisible ? this.headerLogoMascot : this.headerLogoDefault;
  }

  currentHeaderAlt() {
    return this.isHeaderMascotVisible ? 'mascote da FullDev' : 'logo FullDev';
  }

  triggerHeaderFlip() {
    if (this.isHeaderFlipping) {
      return;
    }

    this.headerFlipDirection = this.isHeaderMascotVisible ? 'backward' : 'forward';
    this.headerLightVariant = this.headerLightVariant === 'a' ? 'b' : 'a';
    this.isHeaderMascotVisible = !this.isHeaderMascotVisible;
    this.isHeaderFlipping = true;

    window.setTimeout(() => {
      this.isHeaderFlipping = false;
    }, this.headerFlipDurationMs);
  }

  onHeaderLogoClick() {
    this.triggerHeaderFlip();
  }

  activeInstitutionalContent() {
    return this.institutionalContent[this.activeInstitutionalKey];
  }

  activeInstitutionalItems() {
    const content = this.activeInstitutionalContent();
    return 'items' in content ? content.items : this.emptyInstitutionalItems;
  }

  openExternalLink(url: string) {
    if (!url) {
      return;
    }

    window.open(url, '_blank');
  }
}
