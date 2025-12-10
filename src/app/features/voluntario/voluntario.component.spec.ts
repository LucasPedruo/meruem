import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { VoluntarioComponent } from './voluntario.component';

describe('VoluntarioComponent', () => {
  let component: VoluntarioComponent;
  let fixture: ComponentFixture<VoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoluntarioComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(VoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
