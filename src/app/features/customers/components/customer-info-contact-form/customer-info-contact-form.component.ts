import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberInputDirective } from '../../../../core/directives/only-number-input.directive';
import { RouterModule, Router } from '@angular/router';
import { CustomerApiService } from '../../services/customerApi.service';
import { ContactMediumApiService } from '../../services/contactMediumApi.service';
import { AddressApiService } from '../../services/addressApi.service';
import { Store, select } from '@ngrx/store';
import { PostContactMediumRequest } from '../../models/requests/contactMedium/post-contact-medium-request';
import { selectContactMedium } from '../../../../shared/store/contactMedium/contact-medium.selector';
import { setContactMedium } from '../../../../shared/store/contactMedium/contact-medium.action';

@Component({
  selector: 'app-customer-info-contact-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    RouterModule
  ],
  templateUrl: './customer-info-contact-form.component.html',
  styleUrl: './customer-info-contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoContactFormComponent {

  form:FormGroup;

  
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
    
  }

  createForm(){
    this.fb.group({
      email: new FormControl(''),
      mobilePhone: new FormControl('+90'),
      homePhone: new FormControl('+90'),
      fax: new FormControl('+90'),
    });
  }

  createContactMedium() {
    const contactMedium : PostContactMediumRequest={
      customerId: null,
      email:this.form.value.email,
      mobilePhone: this.form.value.mobilePhone,
      homePhone: this.form.value.homePhone,
      fax:this.form.value.fax
      
    };
    this.store.dispatch(
      setContactMedium({contactMedium})
    )
    this.router.navigate([''])
  }
}
