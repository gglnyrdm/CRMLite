import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offer-selection-catalog-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './offer-selection-catalog-form.component.html',
  styleUrl: './offer-selection-catalog-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferSelectionCatalogFormComponent {

}
