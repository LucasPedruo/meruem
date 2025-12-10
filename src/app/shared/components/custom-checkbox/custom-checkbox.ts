import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox',
  imports: [MaterialModule, ReactiveFormsModule],
  styleUrl: './custom-checkbox.scss',
  template: `
    <section>
      <mat-checkbox [formControl]="control"> {{ label || 'Opção' }} </mat-checkbox>
    </section>
  `,
})
export class CustomCheckboxComponent {
  control = new FormControl(false);
  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
}
