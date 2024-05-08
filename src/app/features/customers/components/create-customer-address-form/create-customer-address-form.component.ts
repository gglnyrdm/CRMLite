import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-customer-address-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './create-customer-address-form.component.html',
  styleUrl: './create-customer-address-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerAddressFormComponent { }
