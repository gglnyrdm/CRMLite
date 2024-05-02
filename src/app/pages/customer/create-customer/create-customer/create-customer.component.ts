import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateCustomerFormComponent } from '../../../../features/customers/create-customer-form/create-customer-form/create-customer-form.component';
import { HeaderComponent } from '../../../../shared/components/header/header/header.component';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    CommonModule,
    CreateCustomerFormComponent,
    HeaderComponent
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerComponent { }
