import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CreateCustomerRequest } from '../../../models/requests/customer/create-customer-request';
import { CustomerApiService } from '../../../services/customerApi.service';
import { OnlyLetterDirective } from '../../../../../core/directives/only-letter.directive';
import { OnlyNumberInputDirective } from '../../../../../core/directives/only-number-input.directive';
import { Store, select } from '@ngrx/store';
import { setIndividualCustomer } from '../../../../../shared/store/customers/individual-customer.action';
import { selectIndividualCustomer } from '../../../../../shared/store/customers/individual-customer.selector';

@Component({
  selector: 'app-create-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OnlyLetterDirective,
    OnlyNumberInputDirective
  ],
  templateUrl: './create-customer-form.component.html',
  styleUrl: './create-customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerFormComponent {
  isFormValid: boolean = false;
  form:FormGroup;
  //birthDate
  currentDate = new Date();
  eighteenYearsAgo = new Date(this.currentDate.getFullYear() - 18, this.currentDate.getMonth(), this.currentDate.getDate());
  formattedDate = `${this.eighteenYearsAgo.getFullYear()}-${String(this.eighteenYearsAgo.getMonth() + 1).padStart(2, '0')}-${String(this.eighteenYearsAgo.getDate()).padStart(2, '0')}`;
  
  showNationalityIdWarning: boolean = false;
  showInvalidFormWarning:boolean = false;

constructor(
  private fb:FormBuilder,
  private customerApiService:CustomerApiService,
  private store:Store<{individualCustomer:CreateCustomerRequest}>,
  private router:Router
){

  // this.form.valueChanges.subscribe(() => {
  //   this.isFormValid = this.form.valid;
  // });
}

ngOnInit():void {
  this.createForm();
  this.store.pipe(select(selectIndividualCustomer)).subscribe((individualCustomer)=>{
    console.log(individualCustomer)
    this.form.patchValue(individualCustomer)
  })
}

onSubmitForm() {
  if (this.form.valid) {
    if (this.form.controls['nationalityIdentity'].value.length < 11 ) {
      this.showNationalityIdWarning = true;
      this.showInvalidFormWarning = false;

    } else {
      this.showNationalityIdWarning = false;
      this.createCustomer();
      console.log("Başarılı")
    }
  } else {
    this.showInvalidFormWarning = true;
    console.error('Form is invalid', this.form.value);
  }
}

createForm() {
  this.form = this.fb.group({
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    motherName: [''],
    fatherName: [''],
    birthDate: ['', Validators.required],
    nationalityIdentity: ['', Validators.required],
  });
}



createCustomer() {
  const individualCustomer : CreateCustomerRequest={
    firstName:this.form.value.firstName,
    lastName:this.form.value.lastName,
    gender:this.form.value.gender,
    motherName:this.form.value.motherName,
    middleName:this.form.value.middleName,
    birthDate:this.form.value.birthDate,
    fatherName:this.form.value.fatherName,
    nationalityIdentity:this.form.value.nationalityIdentity
  };

  this.store.dispatch(
    setIndividualCustomer({individualCustomer})
  )

  this.router.navigate(['createcustomer/addressinfo'])
}
}
