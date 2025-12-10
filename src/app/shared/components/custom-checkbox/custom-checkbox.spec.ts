import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCheckboxComponent } from './custom-checkbox';

describe('CustomCheckboxComponent', () => {
  let component: CustomCheckboxComponent;
  let fixture: ComponentFixture<CustomCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
