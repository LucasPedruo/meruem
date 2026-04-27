import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

const HACKATHON_URL =
  'https://www.sympla.com.br/evento/hackathon-varejo-inteligente-transformacao-digital-experiencia-phygital-e-inovacao-no-varejo/3385412?share_id=copiarlink';

@Component({
  selector: 'app-hackathon-redirect',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class HackathonRedirectComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.location.assign(HACKATHON_URL);
  }
}

