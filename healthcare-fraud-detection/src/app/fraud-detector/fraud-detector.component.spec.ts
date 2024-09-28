import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudDetectorComponent } from './fraud-detector.component';

describe('FraudDetectorComponent', () => {
  let component: FraudDetectorComponent;
  let fixture: ComponentFixture<FraudDetectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FraudDetectorComponent]
    });
    fixture = TestBed.createComponent(FraudDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
