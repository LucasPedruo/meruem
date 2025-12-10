import { NgModule } from '@angular/core';

// Modules actually used in the project
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';

// Only export what's actually being used
const MaterialModules = [
  MatButtonModule,
  MatProgressSpinnerModule, // Used in CustomButton
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatMenuModule,
];

@NgModule({
  imports: MaterialModules,
  exports: MaterialModules,
})
export class MaterialModule {}
