import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button';
import { ModalComponent } from '../../shared/components/custom-modal/custom-modal';
import { FooterComponent } from '../../shared/components/footer/footer-component';
import { SocialComponent } from '../../shared/components/social-component/social-component';
import { GruposComponent } from '../grupos/grupos.component';
import { _fixeGroups } from '../grupos/group.model';

type GenderPreference = 'female' | 'male' | 'lgbt' | 'not_informed';

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
export class HomeComponent implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly queensStorageKey = 'queens-of-deploy-confirmed';
  private readonly genderStorageKey = 'fulldev-user-gender';
  private readonly homeGroups = [
    {
      src: 'fulldev.png',
      text: 'Tecnologia 1',
      description: '1017 de 1024 Membros',
      linkGroup: 'ChrXjnNn3Xh1gTikrYyjAs',
    },
    {
      src: 'fulldev.png',
      text: 'Tecnologia 2',
      description: '339 de 1024 Membros',
      linkGroup: 'H3uqzOSGodo9URWQbKQBgq',
    },
    {
      src: 'queens.jpg',
      text: 'Queens of Deploy',
      description: '612 de 1024 Membros',
      linkGroup: 'KOKFfsXGD1PBVWvAXXNbcb',
    },
    {
      src: 'RainbowStack.png',
      text: 'RainbowStack',
      description: '102 de 1024 Membros',
      linkGroup: 'BtWA88gNq3KGmAxAobB8X3',
    },
    {
      src: 'logo-fulldev-games.png',
      text: 'Games',
      description: '10 de 1024 Membros',
      linkGroup: 'CfM0zq1T8Oo9b9yvs0HZRK',
    },
  ] as const;

  readonly emptyInstitutionalItems: readonly string[] = [];
  readonly headerLogoDefault = 'fulldev.png';
  readonly headerLogoQueens = 'queens.jpg';
  readonly headerLogoRainbow = 'RainbowStack.png';
  readonly headerLogoMascot = 'mascote.png';
  readonly headerFlipDurationMs = 200;
  readonly newsletterSubscribeUrl =
    'https://substack.com/@fulldev?utm_campaign=profile&utm_medium=profile-page';
  readonly newsletterEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://fulldev.substack.com/embed',
  );
  readonly vscodeThemeUrl =
    'https://marketplace.visualstudio.com/items?itemName=FullDev.beru-theme';
  showModal: boolean = false;
  showInstitutionalModal = false;
  showVscodeThemeModal = false;
  showQueensAccessModal = false;
  showGenderPreferenceModal = false;
  pendingQueensLinkGroup = '';
  accessRestrictionNotice = '';
  private accessRestrictionNoticeTimeout?: ReturnType<typeof setTimeout>;
  genderPreference: GenderPreference | null = null;
  hasGenderPreference = false;
  isHeaderFlipping = false;
  isHeaderMascotVisible = false;
  headerLightVariant: 'a' | 'b' = 'a';
  headerFlipDirection: 'forward' | 'backward' = 'forward';
  activeInstitutionalKey: 'eventos' | 'sobre' | 'redes' | 'equipe' | 'parceiros' = 'sobre';
  appTitle = environment.appTitle;
  isProduction = environment.production;
  get featuredGroups() {
    if (this.genderPreference === 'female') {
      return this.homeGroups.filter((group) => group.text === 'Queens of Deploy');
    }

    if (this.genderPreference === 'lgbt') {
      return this.homeGroups.filter((group) => group.text === 'RainbowStack');
    }

    return this.homeGroups.filter((group) => group.text === 'Tecnologia 1' || group.text === 'Tecnologia 2');
  }
  modalGroups = () => {
    const featuredGroupNames = new Set<string>(this.featuredGroups.map((group) => group.text));
    const hiddenHomeGroups = this.homeGroups.filter((group) => !featuredGroupNames.has(group.text));
    const groups = [...hiddenHomeGroups, ..._fixeGroups()];
    const seen = new Set<string>();

    return groups.filter((group) => {
      if (seen.has(group.text)) {
        return false;
      }

      seen.add(group.text);
      return true;
    });
  };
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
    {
      name: 'PUC Minas',
      stack: 'Universidade (Belo Horizonte, MG).',
      image: 'pucminas_logo.png',
      linkedin: 'https://www.linkedin.com/school/pucminas',
    },
    {
      name: 'Web Summit Rio',
      stack: 'Evento internacional de tecnologia e inovação.',
      image: 'web_summit_rio_logo.jpg',
      linkedin: 'https://www.linkedin.com/company/web-summit-rio/',
    },
    {
      name: 'Rocketseat',
      stack: 'Escola de programação e comunidade dev.',
      image: 'rocketseat_logo.jpg',
      linkedin: 'https://www.linkedin.com/school/rocketseat/posts/?feedView=all',
    },
  ] as const;
  socialChannels = [
    {
      name: 'LinkedIn',
      description:
        'Nosso segundo canal para novidades, parcerias, eventos e movimentações da comunidade.',
      icon: 'linkedin.svg',
      link: 'https://www.linkedin.com/company/comunidadefulldev/posts/?feedView=all',
    },
    {
      name: 'Discord',
      description:
        'Nosso terceiro espaço para trocar ideias, acompanhar conversas e se aproximar da comunidade.',
      icon: 'discord.svg',
      link: 'https://discord.com/invite/2vMkX7kc8t',
    },
  ] as const;
  eventCards = [
    {
      name: 'Web Summit Rio',
      stack: 'Evento internacional de tecnologia e inovação.',
      image: 'web_summit_rio_logo.jpg',
      buttonText: 'Participar',
      link: '/websummit',
      dateLabel: '15/05/2026',
      featured: true,
      state: 'normal' as const,
    },
    {
      name: 'Aniversário de 9 anos da Rocketseat',
      stack: 'Celebração da comunidade dev da Rocketseat.',
      image: 'rocketseat_logo.jpg',
      buttonText: 'Participar',
      link: 'https://rseat.in/aniversario-rocketseat-devs-fulldev',
      dateLabel: '11/05/2026',
      featured: false,
      state: 'normal' as const,
    },
    {
      name: 'HandsOn Rio',
      stack: 'Em fase de organização',
      image: 'fofrio_logo.jpg',
      buttonText: 'Aguarde',
      link: '',
      dateLabel: '',
      featured: false,
      state: 'normal' as const,
    },
    /*  {
      name: 'FullDev Open Source',
      stack: 'Em fase de organização',
      image: 'fulldev.png',
      buttonText: '',
      link: '',
      state: 'loading' as const,
    }, */
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
        'A FullDev nasceu em 2024 a partir de um grupo de pessoas que queriam aprender programação, trocar experiências e não caminhar sozinhas na área de tecnologia.',
        'Hoje, somos uma comunidade feita por devs e para devs, reunindo pessoas em diferentes níveis de experiência para compartilhar conhecimento, oportunidades e vivências reais do mercado.',
        'Nosso objetivo é criar um ambiente colaborativo, acessível e ativo, onde dúvidas viram conversas, ideias viram projetos e conexões ajudam pessoas a crescerem profissionalmente.',
        'A comunidade promove eventos, hackathons, indicações de vagas, conteúdos técnicos, ações com parceiros e espaços de networking para aproximar talentos, empresas e iniciativas de tecnologia.',
        'Mais do que um grupo, a FullDev é um ponto de encontro para quem acredita que aprender em comunidade torna a jornada mais leve, prática e cheia de possibilidades.',
      ],
    },
    redes: {
      title: 'Redes sociais',
      description:
        'A FullDev se organiza em canais diferentes para facilitar contato, novidades e troca entre membros.',
      items: [
        'LinkedIn é o nosso canal para acompanhar novidades, parceiros e eventos.',
        'Discord é o nosso espaço para conversas, networking e aproximação com a comunidade.',
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
    // loja: {
    //   title: 'Loja',
    //   description: 'Em breve teremos uma loja com produtos exclusivos da FullDev!',
    // },
    // school: {
    //   title: 'School',
    //   description: 'Em breve teremos uma school com cursos exclusivos da FullDev!',
    // }
  } as const;

  constructor() {}

  ngOnInit() {
    if (typeof window === 'undefined') {
      return;
    }

    const savedGender = window.localStorage.getItem(this.genderStorageKey);
    const hasConfirmedQueens = window.localStorage.getItem(this.queensStorageKey) === 'true';

    this.hasGenderPreference = Boolean(savedGender || hasConfirmedQueens);

    if (savedGender === 'female' || hasConfirmedQueens) {
      this.genderPreference = 'female';
      this.applyGenderTheme('female');

      if (!savedGender && hasConfirmedQueens) {
        window.localStorage.setItem(this.genderStorageKey, 'female');
      }

      return;
    }

    if (savedGender === 'male' || savedGender === 'lgbt' || savedGender === 'not_informed') {
      this.genderPreference = savedGender;
      this.applyGenderTheme(savedGender);
      return;
    }

    if (savedGender === 'other') {
      this.genderPreference = 'not_informed';
      window.localStorage.setItem(this.genderStorageKey, 'not_informed');
      this.clearGenderThemes();
      return;
    }

    if (!savedGender) {
      this.showGenderPreferenceModal = true;
    }
  }

  remainingGroupsCount() {
    return this.modalGroups().length;
  }

  groupButtonState(groupName: string): 'normal' | 'disabled' {
    const shouldBlockGroup =
      groupName === 'Queens of Deploy' || groupName === 'RainbowStack';
    const shouldBlockByPreference =
      this.genderPreference === 'male' || this.genderPreference === 'not_informed';

    return shouldBlockGroup && shouldBlockByPreference ? 'disabled' : 'normal';
  }

  showRestrictedGroupNotification(groupName: string) {
    if (this.groupButtonState(groupName) !== 'disabled') {
      return;
    }

    this.accessRestrictionNotice =
      'Este grupo so esta habilitado para o respectivo genero selecionado.';

    if (this.accessRestrictionNoticeTimeout) {
      clearTimeout(this.accessRestrictionNoticeTimeout);
    }

    this.accessRestrictionNoticeTimeout = setTimeout(() => {
      this.accessRestrictionNotice = '';
      this.accessRestrictionNoticeTimeout = undefined;
    }, 4200);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openQueensAccessModal(linkGroup: string) {
    this.pendingQueensLinkGroup = linkGroup;
    this.showQueensAccessModal = true;
  }

  closeQueensAccessModal() {
    this.showQueensAccessModal = false;
  }

  closeGenderPreferenceModal() {
    this.showGenderPreferenceModal = false;
  }

  selectGenderPreference(gender: GenderPreference) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.genderStorageKey, gender);
    }

    this.hasGenderPreference = true;
    this.genderPreference = gender;
    this.showHeaderLogo();
    this.applyGenderTheme(gender);

    this.closeGenderPreferenceModal();
  }

  confirmQueensAccess() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.queensStorageKey, 'true');
      window.localStorage.setItem(this.genderStorageKey, 'female');
    }

    this.applyGenderTheme('female');
    this.genderPreference = 'female';
    this.hasGenderPreference = true;
    this.showHeaderLogo();

    this.closeQueensAccessModal();

    if (this.pendingQueensLinkGroup) {
      window.open(`https://chat.whatsapp.com/${this.pendingQueensLinkGroup}?mode=hqrt1`, '_blank');
    }
  }

  openVscodeThemeModal() {
    this.showVscodeThemeModal = true;
  }

  closeVscodeThemeModal() {
    this.showVscodeThemeModal = false;
  }

  resetGenderPreference() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(this.genderStorageKey);
      window.localStorage.removeItem(this.queensStorageKey);
    }

    this.genderPreference = null;
    this.hasGenderPreference = false;
    this.showHeaderLogo();
    this.pendingQueensLinkGroup = '';
    this.showQueensAccessModal = false;
    this.clearGenderThemes();
    this.showGenderPreferenceModal = true;
  }

  openInstitutionalModal(key: 'eventos' | 'sobre' | 'redes' | 'equipe' | 'parceiros') {
    this.activeInstitutionalKey = key;
    this.showInstitutionalModal = true;
  }

  closeInstitutionalModal() {
    this.showInstitutionalModal = false;
  }

  currentHeaderImage() {
    if (this.isHeaderMascotVisible) {
      return this.headerLogoMascot;
    }

    if (this.genderPreference === 'female') {
      return this.headerLogoQueens;
    }

    if (this.genderPreference === 'lgbt') {
      return this.headerLogoRainbow;
    }

    return this.headerLogoDefault;
  }

  currentHeaderAlt() {
    if (this.isHeaderMascotVisible) {
      return 'mascote da FullDev';
    }

    if (this.genderPreference === 'female') {
      return 'logo do Queens of Deploy';
    }

    if (this.genderPreference === 'lgbt') {
      return 'logo do RainbowStack';
    }

    return 'logo FullDev';
  }

  currentHeaderAriaLabel() {
    return `Exibindo ${this.currentHeaderAlt()}`;
  }

  private showHeaderLogo() {
    this.isHeaderMascotVisible = false;
    this.headerFlipDirection = 'backward';
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

  private applyGenderTheme(gender: GenderPreference) {
    if (typeof document !== 'undefined') {
      this.clearGenderThemes();

      if (gender === 'female') {
        document.body.classList.add('theme-queens');
      }

      if (gender === 'lgbt') {
        document.body.classList.add('theme-rainbow');
      }
    }
  }

  private clearGenderThemes() {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-queens');
      document.body.classList.remove('theme-rainbow');
    }
  }
}
