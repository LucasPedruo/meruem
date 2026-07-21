import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent {
  readonly startYear = 2024;

  currentYear(): number {
    return new Date().getFullYear();
  }
}
