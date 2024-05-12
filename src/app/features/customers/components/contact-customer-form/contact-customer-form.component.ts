import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyNumberInputDirective } from '../../../../core/directives/only-number-input.directive';
import { RouterModule, Router } from '@angular/router';
import { EmailFormatDirective } from '../../../../core/directives/email-format.directive';
import { PostContactMediumRequest } from '../../models/requests/contactMedium/post-contact-medium-request';
import { setContactMedium } from '../../../../shared/store/contactMedium/contact-medium.action';
import { CustomerApiService } from '../../services/customerApi.service';
import { ContactMediumApiService } from '../../services/contactMediumApi.service';
import { AddressApiService } from '../../services/addressApi.service';
import { selectContactMedium } from '../../../../shared/store/contactMedium/contact-medium.selector';
import { Store, select } from '@ngrx/store';
import { CreateCustomerRequest } from '../../models/requests/customer/create-customer-request';
import { PostAddressRequest } from '../../models/requests/address/post-address-request';
import { selectIndividualCustomer } from '../../../../shared/store/customers/individual-customer.selector';
import { selectIndividualCustomerAddress } from '../../../../shared/store/addresses/customer-address.selector';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-contact-customer-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    RouterModule,
    EmailFormatDirective
    ],
  templateUrl: './contact-customer-form.component.html',
  styleUrl: './contact-customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCustomerFormComponent {


  formContactMedium:FormGroup; 
  constructor(
    private fb:FormBuilder,
    private customerApiService: CustomerApiService,
    private contactMediumApiService: ContactMediumApiService,
    private addressApiService: AddressApiService,
    private store:Store<{contactMedium:PostContactMediumRequest}>,
    private router:Router
  ){}
  ngOnInit():void {
    this.createForm();
    this.store.pipe(select(selectContactMedium)).subscribe((contactMedium) => {
      console.log(contactMedium)
      this.formContactMedium.patchValue(contactMedium);
    });
  }

  createForm(){
    this.formContactMedium = this.fb.group({
      email: new FormControl('',[Validators.required]), //,Validators.maxLength(250)
      mobilePhone: new FormControl('+90',[Validators.required]),
      homePhone: new FormControl('+90'), //,Validators.maxLength(10)
      fax: new FormControl('+90'),
    });
  }

  createContactMedium() {
    const contactMedium : PostContactMediumRequest={
      customerId: null,
      email:this.formContactMedium.value.email,
      mobilePhone: this.formContactMedium.value.mobilePhone,
      homePhone: this.formContactMedium.value.homePhone,
      fax:this.formContactMedium.value.fax
      
    };
    this.store.dispatch(
      setContactMedium({contactMedium})
    )
    this.router.navigate(['/customerinfo'])
  }

  onSubmitForm() {
    // this.createContactMedium();
    this.makeRequests();
}

goPrevious() {
  const contactMedium: PostContactMediumRequest = {
    email: this.formContactMedium.value.email,
    homePhone: this.formContactMedium.value.homePhone,
    mobilePhone: this.formContactMedium.value.mobilePhone,
    fax: this.formContactMedium.value.fax,
    customerId: null,
  };
  this.store.dispatch(setContactMedium({ contactMedium }));
  this.router.navigate(['/createcustomer/addressinfo']);
}

makeRequests(){
  let customerFromState: CreateCustomerRequest;
  let addressFromState: PostAddressRequest;
  let customerIdFromFirstReq: number;
  this.store
    .pipe(select(selectIndividualCustomer))
    .subscribe((individualCustomer) => {
      customerFromState = individualCustomer;
    });
    this.store
    .pipe(select(selectIndividualCustomerAddress))
    .subscribe((customerAddress) => {
      addressFromState = customerAddress;
    });
  this.customerApiService.postCustomer(customerFromState).pipe(
    switchMap( response1 => {
        console.log("deneme");
        debugger;
        customerIdFromFirstReq = response1.id;
        let newAddress: PostAddressRequest = {
          customerId: response1.id,
          cityId: addressFromState.cityId,
          houseFlatNumber: addressFromState.houseFlatNumber,
          street: addressFromState.street,
          addressDescription: addressFromState.addressDescription,
        }
        debugger;
        return this.addressApiService.post(newAddress).pipe(
          switchMap(response2 => {
            let contactMedium: PostContactMediumRequest = {
              email: this.formContactMedium.value.email,
              homePhone: this.formContactMedium.value.homePhone,
              mobilePhone: this.formContactMedium.value.mobilePhone,
              fax: this.formContactMedium.value.fax,
              customerId: customerIdFromFirstReq,
            }
            return this.contactMediumApiService.post(contactMedium);
          })
        );
    })).subscribe();
}
}
