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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogPopupComponent } from '../../../../../shared/components/dialog-popup/dialog-popup.component';
import { CheckNationalityIdentityOnMernis } from '../../../models/requests/customer/check-nationality-identity-on-mernis-request';

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
  currentDate = new Date();
  eighteenYearsAgo = new Date(this.currentDate.getFullYear() - 18, this.currentDate.getMonth(), this.currentDate.getDate());
  formattedDate = `${this.eighteenYearsAgo.getFullYear()}-${String(this.eighteenYearsAgo.getMonth() + 1).padStart(2, '0')}-${String(this.eighteenYearsAgo.getDate()).padStart(2, '0')}`;
  
  checkNationalityIdentityOnMernis: CheckNationalityIdentityOnMernis;
constructor(
  private fb:FormBuilder,
  private customerApiService:CustomerApiService,
  private store:Store<{individualCustomer:CreateCustomerRequest}>,
  private router:Router,
  private dialog: MatDialog
){}

ngOnInit():void {
  this.createForm();
  
  this.store.pipe(select(selectIndividualCustomer)).subscribe((individualCustomer)=>{
    console.log(individualCustomer)
    this.form.patchValue(individualCustomer)
  })
}

checkNationalityIdentityRequest() {
  const birthDateValue = this.form.value.birthDate;
  let birthDate: Date;

  if (typeof birthDateValue === 'string') {
    birthDate = new Date(birthDateValue);
  } else {
    birthDate = birthDateValue;
  }
  this.checkNationalityIdentityOnMernis ={
    nationalityIdentity:this.form.value.nationalityIdentity,
    firstName:this.checkMiddleName(),
    lastName:this.form.value.lastName,
    birthDate:birthDate.getFullYear()
  }
}
checkMiddleName() {
  if(this.form.value.middleName){
    return this.form.value.firstName+ ' ' +this.form.value.middleName;
  }
  else {
    return this.form.value.firstName;
  }
}
onSubmitForm() {
  if (this.form.valid) {
    this.customerApiService.checkNationalityIdentityExists(this.form.value.nationalityIdentity).subscribe({
      next: async (response) => {
        if(!response)
          {
            this.checkNationalityIdentityRequest();
            this.customerApiService.checkNationalityIdentityOnMernis(this.checkNationalityIdentityOnMernis).subscribe({
              next: async (response) => {
                if(!response)
                  {
                    this.openPopup("Customer demographic information have been saved successfully.");
                    await this.delay(2500);
                    this.createCustomer();
                  }
                  else {
                    this.openPopup("You entered invalid ID.");
                    await this.delay(2500);
                  }
              },
              error: (err) => {
                console.log(err);
              }
            });
           
          }
          else {
            await this.openPopup("A customer already existing with this nationality ID");
          }
      },
      error: (err) => {
        console.log(err);
      }
    });
      
    }
  else {
    console.error('Form is invalid', this.form.value);
  }
}

openPopup(message: string): void {
  const dialogRef: MatDialogRef<DialogPopupComponent> = this.dialog.open(DialogPopupComponent, {
    data: { message: message },
    panelClass: 'custom-dialog-container'
  });

  setTimeout(() => {
    dialogRef.close();
  }, 2500); 
}

delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

createForm() {
  this.form = this.fb.group({
    firstName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    middleName: ['',[Validators.minLength(2),Validators.maxLength(20)]],
    lastName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    gender: ['', Validators.required],
    motherName: ['',[Validators.minLength(2),Validators.maxLength(20)]],
    fatherName: ['',[Validators.minLength(2),Validators.maxLength(20)]],
    birthDate: ['', Validators.required],
    nationalityIdentity: ['', [Validators.required,Validators.minLength(11)]]
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
