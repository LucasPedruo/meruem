import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

const NEWSLETTER_URL =
  'https://substack.com/@fulldev?utm_campaign=profile&utm_medium=profile-page';

@Component({
  selector: 'app-newsletter-redirect',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class NewsletterRedirectComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.location.assign(NEWSLETTER_URL);
  }
}
