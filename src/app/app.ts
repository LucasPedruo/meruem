import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly queensStorageKey = 'queens-of-deploy-confirmed';
  private readonly genderStorageKey = 'fulldev-user-gender';
  protected readonly title = signal(environment.appTitle);

  ngOnInit() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (
      window.localStorage.getItem(this.queensStorageKey) === 'true' ||
      window.localStorage.getItem(this.genderStorageKey) === 'female'
    ) {
      document.body.classList.add('theme-queens');
    }

    if (window.localStorage.getItem(this.genderStorageKey) === 'lgbt') {
      document.body.classList.add('theme-rainbow');
    }
  }
}
