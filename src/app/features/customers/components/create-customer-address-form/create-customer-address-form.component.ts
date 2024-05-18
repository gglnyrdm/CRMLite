import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AddressApiService } from '../../services/addressApi.service';
import { GetCitiesResponse } from '../../models/responses/address/get-cities-response';
import { setIndividualCustomerAddress } from '../../../../shared/store/addresses/customer-address.action';
import { PostAddressRequest } from '../../models/requests/address/post-address-request';
import { Store, select } from '@ngrx/store';
import { selectIndividualCustomerAddress } from '../../../../shared/store/addresses/customer-address.selector';

@Component({
  selector: 'app-create-customer-address-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-customer-address-form.component.html',
  styleUrl: './create-customer-address-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerAddressFormComponent {

  form:FormGroup;
  public cityList!: GetCitiesResponse[];

  constructor( 
    private fb:FormBuilder,
    private addressApiService:AddressApiService,
    private store:Store<{individualCustomerAddress:PostAddressRequest}>,
    private router:Router
  ) {}

  ngOnInit():void {
    this.createForm();
    this.store.pipe(select(selectIndividualCustomerAddress)).subscribe((individualCustomerAddress)=>{
      console.log(individualCustomerAddress)
      this.form.patchValue(individualCustomerAddress)
    })
      this.addressApiService.getCities().subscribe((response) => {
      this.cityList = response;
    });
  }

  createForm() {
    this.form = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required], //,Validators.maxLength(50) hata veriyor.
      houseFlatNumber: ['', Validators.required], //,Validators.maxLength(20) hata veriyor
      addressDescription: ['', Validators.required], //,Validators.maxLength(150) hata veriyor
    });
  }

  createCustomerAddress() {
  const selectedCity = this.cityList.find(city => city.id === Number(this.form.value.city));
  const cityName = selectedCity.name;
  console.log('Selected City Name:', cityName);
    const individualCustomerAddress : PostAddressRequest={
      cityName:cityName,
      customerId: null,
      cityId: this.form.value.city,
      houseFlatNumber: this.form.value.houseFlatNumber,
      street: this.form.value.street,
      addressDescription: this.form.value.addressDescription,
    };
    this.store.dispatch(
      setIndividualCustomerAddress({individualCustomerAddress})
    )
    this.router.navigate(['createcustomer/addressinfo'])
  }

  onSubmitForm() {
    this.createCustomerAddress();
}
}
