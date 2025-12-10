import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  styleUrl: './custom-select.scss',
  template: `
    <mat-form-field class="custom-select">
      <mat-select required [formControl]="selectFormControl">
        <mat-option *ngFor="let country of countries" [value]="country.code">
          {{ country.code }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class SelectComponent {
  selectFormControl = new FormControl('+55', Validators.required);

  countries = [
    { code: '+55', name: 'Brazil' },
    { code: '+1', name: 'USA' },
    { code: '+91', name: 'India' },
  ];
}
