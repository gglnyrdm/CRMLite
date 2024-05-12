import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header/header.component';

@Component({
  selector: 'app-offer-selection',
  standalone: true,
  imports: [RouterModule,
    HeaderComponent
  ],
  templateUrl: './offer-selection.component.html',
  styleUrl: './offer-selection.component.scss'
})
export class OfferSelectionComponent {

}
