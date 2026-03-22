import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalAttributesComponent } from './physical-attributes.component';

describe('PhysicalAttributesComponent', () => {
  let component: PhysicalAttributesComponent;
  let fixture: ComponentFixture<PhysicalAttributesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicalAttributesComponent]
    });
    fixture = TestBed.createComponent(PhysicalAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
