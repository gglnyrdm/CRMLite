import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateCustomerFormComponent } from '../../../../features/customers/create-customer-form/create-customer-form/create-customer-form.component';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    CommonModule,
    CreateCustomerFormComponent
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerComponent { }
