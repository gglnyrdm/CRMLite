import { Component } from '@angular/core';
import { OfferSelectionCatalogFormComponent } from '../offer-selection-catalog-form/offer-selection-catalog-form.component';
import { OfferSelectionCampaignFormComponent } from '../offer-selection-campaign-form/offer-selection-campaign-form.component';
import { OfferSelectionBasketComponent } from '../offer-selection-basket/offer-selection-basket.component';

@Component({
  selector: 'app-offer-selection-area',
  standalone: true,
  imports: [OfferSelectionCatalogFormComponent,
    OfferSelectionCampaignFormComponent,
    OfferSelectionBasketComponent
  ],
  templateUrl: './offer-selection-area.component.html',
  styleUrl: './offer-selection-area.component.scss'
})
export class OfferSelectionAreaComponent {

}
