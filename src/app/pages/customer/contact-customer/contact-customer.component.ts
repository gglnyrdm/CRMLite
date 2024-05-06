import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header/header.component";
import { ContactCustomerFormComponent } from '../../../features/customers/components/contact-customer-form/contact-customer-form.component';

@Component({
    selector: 'app-contact-customer',
    standalone: true,
    templateUrl: './contact-customer.component.html',
    styleUrl: './contact-customer.component.scss',
    imports: [HeaderComponent, ContactCustomerFormComponent]
})
export class ContactCustomerComponent {

}
