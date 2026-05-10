import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

const WEBSUMMIT_URL = 'https://forms.gle/n2ynmHFjQZdAqNcf9';

@Component({
  selector: 'app-websummit-redirect',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class WebsummitRedirectComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.location.assign(WEBSUMMIT_URL);
  }
}
