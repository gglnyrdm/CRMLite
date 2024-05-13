import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSelectionBasketComponent } from './offer-selection-basket.component';

describe('OfferSelectionBasketComponent', () => {
  let component: OfferSelectionBasketComponent;
  let fixture: ComponentFixture<OfferSelectionBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferSelectionBasketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferSelectionBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
