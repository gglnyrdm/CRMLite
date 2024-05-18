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

onSubmitForm() {
  if (this.form.valid) {
    this.customerApiService.checkNationalityIdentityExists(this.form.value.nationalityIdentity).subscribe({
      next: async (response) => {
        if(!response)
          {
            this.openPopup("Customer demographic information have been saved successfully.");
            await this.delay(2500);
            this.createCustomer();
            console.log("Başarılı")
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
    dialogRef.close(); // Pop-up'ı belirli bir süre sonra kapat
  }, 2500); // 2.5 saniye beklet
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
    motherName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
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
