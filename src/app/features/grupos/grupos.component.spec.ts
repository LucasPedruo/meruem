import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposComponent } from './grupos.component';

describe('GruposComponent', () => {
  let component: GruposComponent;
  let fixture: ComponentFixture<GruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(GruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
