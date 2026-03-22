import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuredDataComponent } from './measured-data.component';

describe('MeasuredDataComponent', () => {
  let component: MeasuredDataComponent;
  let fixture: ComponentFixture<MeasuredDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeasuredDataComponent]
    });
    fixture = TestBed.createComponent(MeasuredDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
