import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-customer-address',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './create-customer-address-info.component.html',
  styleUrl: './create-customer-address-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerAddressInfoComponent { }
