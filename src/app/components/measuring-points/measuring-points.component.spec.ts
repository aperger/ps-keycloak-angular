import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringPointsComponent } from './measuring-points.component';

describe('MeasuringPointsComponent', () => {
  let component: MeasuringPointsComponent;
  let fixture: ComponentFixture<MeasuringPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeasuringPointsComponent]
    });
    fixture = TestBed.createComponent(MeasuringPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
