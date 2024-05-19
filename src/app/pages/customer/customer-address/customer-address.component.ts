import { Component, OnInit } from '@angular/core';
import { CreateCustomerAddressFormComponent } from "../../../features/customers/components/create-customer-address-form/create-customer-address-form.component";
import { RouterModule } from '@angular/router';
import { CustomerApiService } from '../../../features/customers/services/customerApi.service';
import { AddressApiService } from '../../../features/customers/services/addressApi.service';
import { GetAddressesByCustomerId } from '../../../features/customers/models/responses/address/get-address-by-customerId-response';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-customer-address',
    standalone: true,
    templateUrl: './customer-address.component.html',
    styleUrls: ['./customer-address.component.scss'],
    imports: [CreateCustomerAddressFormComponent, RouterModule,CommonModule]
})
export class CustomerAddressComponent implements OnInit {
    storedCustomerId: string | null = localStorage.getItem('customerId');
    addressListByCustomerId: GetAddressesByCustomerId[] = [];
    
    constructor(private addressApiService: AddressApiService) {}

    ngOnInit(): void {
        if (this.storedCustomerId) {
            this.addressApiService.getAddressesByCustomerId(this.storedCustomerId).subscribe({
                next: (response) => {
                  debugger;
                    this.addressListByCustomerId = response;
                },
                error: (err) => {
                    console.error('Error fetching addresses', err);
                }
            });
        }
    }
}