import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customer-address-info',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './customer-address-info.component.html',
  styleUrl: './customer-address-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressInfoComponent { }
