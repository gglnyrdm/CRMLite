import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-billing-account',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './create-billing-account.component.html',
  styleUrl: './create-billing-account.component.scss'
})
export class CreateBillingAccountComponent {

}
