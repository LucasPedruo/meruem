import { Component } from '@angular/core';
import { CustomButtonComponent } from '../custom-button/custom-button';

@Component({
  selector: 'app-social-component',
  imports: [CustomButtonComponent],
  templateUrl: './social-component.html',
  styleUrl: './social-component.scss',
})
export class SocialComponent {
  socialLinks = {
    github: 'https://github.com/FullDevOficial',
    youtube: 'https://www.youtube.com/@ComunidadeFulldev',
    linkedin: 'https://www.linkedin.com/company/comunidadefulldev/posts/?feedView=all',
    instagram: 'https://www.instagram.com/comunidadefulldev/#',
    discord: 'https://discord.com/invite/2vMkX7kc8t',
  };

  openExternalLink(url: string): void {
    window.open(url, '_blank', 'nooperner, noreferrer');
  }
}
