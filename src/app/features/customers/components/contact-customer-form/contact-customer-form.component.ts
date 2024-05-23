import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from '../../../../shared/components/dialog-popup/dialog-popup.component';

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

  customerIdFromFirstReq: string;
  induvidualCustomerId: string;

  showMobilePhoneWarning: boolean = false;
  showHomePhoneWarning: boolean = false;
  showFaxWarning: boolean = false;
  showEmailWarning: boolean = false;
  isFormValid: boolean = false;

  formContactMedium: FormGroup;
  constructor(
    private fb: FormBuilder,
    private customerApiService: CustomerApiService,
    private contactMediumApiService: ContactMediumApiService,
    private addressApiService: AddressApiService,
    private store: Store<{ contactMedium: PostContactMediumRequest }>,
    private router: Router,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.createForm();
    this.store.pipe(select(selectContactMedium)).subscribe((contactMedium) => {
      console.log(contactMedium)
      this.formContactMedium.patchValue(contactMedium);
    });

    this.formContactMedium.valueChanges.subscribe(() => {
      this.isFormValid = this.formContactMedium.valid;
    });
  }
  createForm() {
    this.formContactMedium = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(250)]),
      mobilePhone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      homePhone: new FormControl('', [Validators.maxLength(10)]),
      fax: new FormControl('', [Validators.maxLength(10)]),
    });
  }

  onSubmitForm() {
    const { mobilePhone, fax, homePhone, email } = this.formContactMedium.value;
  
    this.showMobilePhoneWarning = false;
    this.showHomePhoneWarning = false;
    this.showFaxWarning = false;
    this.showEmailWarning = false;

    if (mobilePhone.length > 0 && mobilePhone.length < 10) {
      this.showMobilePhoneWarning = true;
    }
  
    if (fax.length > 0 && fax.length < 10) {
      this.showFaxWarning = true;
    }
  
    if (homePhone.length > 0 && homePhone.length < 10) {
      this.showHomePhoneWarning = true;
    }
  
    if (!email.includes('@') || !email.includes('.')) {
      this.showEmailWarning = true;
    }
  
    if (!this.showMobilePhoneWarning && !this.showFaxWarning && !this.showHomePhoneWarning && !this.showEmailWarning) {
      this.makeRequests();
    }
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

  makeRequests() {
    debugger;
    let customerFromState: CreateCustomerRequest;
    let addressFromState: PostAddressRequest;
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
      switchMap(response1 => {
        this.customerIdFromFirstReq = response1.customerId;
        this.induvidualCustomerId = response1.id;
        let newAddress: PostAddressRequest = {
          customerId: response1.customerId,
          cityId: addressFromState.cityId,
          cityName: '',
          houseFlatNumber: addressFromState.houseFlatNumber,
          street: addressFromState.street,
          addressDescription: addressFromState.addressDescription,
        }
        return this.addressApiService.post(newAddress).pipe(
          switchMap(response2 => {
            let contactMedium: PostContactMediumRequest = {
              email: this.formContactMedium.value.email,
              homePhone: this.formContactMedium.value.homePhone,
              mobilePhone: this.formContactMedium.value.mobilePhone,
              fax: this.formContactMedium.value.fax,
              customerId: this.customerIdFromFirstReq,
            }
            return this.contactMediumApiService.post(contactMedium);
          })
        );
      })).subscribe({
        next: async () => {
          await this.openPopup("Customer has been saved.");
          this.router.navigate([`/customer/${this.induvidualCustomerId}/info`])
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  openPopup(message: string): Promise<void> {
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      data: { message: message },
      panelClass: 'custom-dialog-container',
      disableClose: true
    });

    return new Promise(resolve => {
      setTimeout(() => {
        dialogRef.close();
        resolve();
      }, 2500);
    });
  }
}