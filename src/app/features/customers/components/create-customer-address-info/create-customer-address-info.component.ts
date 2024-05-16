import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectIndividualCustomerAddress } from '../../../../shared/store/addresses/customer-address.selector';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostAddressRequest } from '../../models/requests/address/post-address-request';
import { log } from 'console';
import { setIndividualCustomerAddress } from '../../../../shared/store/addresses/customer-address.action';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-create-customer-address',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './create-customer-address-info.component.html',
  styleUrl: './create-customer-address-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerAddressInfoComponent {
  cityId:string;
  street:string;
  houseFlatNumber;
  addressDescription:string;
  cityName:string;

  isAddressVisible: boolean = false;
  constructor(
    private fb:FormBuilder,
    private store:Store<{individualCustomerAddress:PostAddressRequest}>,
  ){}

  ngOnInit():void {
    this.store.pipe(select(selectIndividualCustomerAddress)).subscribe((individualCustomerAddress) => {
      console.log(individualCustomerAddress.addressDescription)
      this.cityId = individualCustomerAddress.cityId;
      this.cityName = individualCustomerAddress.cityName;
      this.street = individualCustomerAddress.street;
      this.houseFlatNumber = individualCustomerAddress.houseFlatNumber;
      this.addressDescription = individualCustomerAddress.addressDescription;
    });
}
  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    console.log("toggle")
  }

  @HostListener('document:click', ['$event'])
  hideMenu(event: MouseEvent) {
    if (!event.target) return;

    const clickedInsideMenu = (event.target as HTMLElement).closest('.address-box-update-menu');
    if (!clickedInsideMenu) {
    console.log("hide")

      this.menuVisible = false;
    }
  }
 }