import { Component } from '@angular/core';
import { CreateCustomerAddressFormComponent } from "../../../features/customers/components/create-customer-address-form/create-customer-address-form.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-customer-address',
    standalone: true,
    templateUrl: './customer-address.component.html',
    styleUrl: './customer-address.component.scss',
    imports: [CreateCustomerAddressFormComponent, RouterModule]
})
export class CustomerAddressComponent {

}
