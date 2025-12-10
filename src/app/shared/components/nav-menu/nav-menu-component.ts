import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-menu-component',
  imports: [RouterModule, MatButtonModule, MatMenuModule, MatIconModule, CommonModule],
  templateUrl: './nav-menu-component.html',
  styleUrl: './nav-menu-component.scss',
})
export class NavMenuComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
