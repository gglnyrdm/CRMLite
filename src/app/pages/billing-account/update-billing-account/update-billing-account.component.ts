import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-billing-account',
  standalone: true,
  imports: [HeaderComponent,RouterModule],
  templateUrl: './update-billing-account.component.html',
  styleUrl: './update-billing-account.component.scss'
})
export class UpdateBillingAccountComponent {

}
