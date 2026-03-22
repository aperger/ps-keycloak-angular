import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuredParametersComponent } from './measured-parameters.component';

describe('MeasuredParametersComponent', () => {
  let component: MeasuredParametersComponent;
  let fixture: ComponentFixture<MeasuredParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeasuredParametersComponent]
    });
    fixture = TestBed.createComponent(MeasuredParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
