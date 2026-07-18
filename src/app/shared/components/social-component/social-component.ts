import { Component } from '@angular/core';
import { toast } from 'ngx-sonner';
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
    instagram: 'https://instagram.com/fulldev.com.br',
    discord: 'https://discord.com/invite/2vMkX7kc8t',
  };

  openExternalLink(url: string): void {
    window.open(url, '_blank', 'noopener, noreferrer');
  }

  showConstructionToast(): void {
    toast.info('Site em construção', {
      description: 'Em breve a experiência completa estará disponível.',
      duration: 3200,
    });
  }
}
