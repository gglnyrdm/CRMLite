import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateCustomerRequest } from '../../../models/createModelRequest';
import { CustomerApiService } from '../../../services/customerApi.service';

@Component({
  selector: 'app-create-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-customer-form.component.html',
  styleUrl: './create-customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerFormComponent {
  isFormValid: boolean = false;

  //birthDate
  currentDate = new Date();
  eighteenYearsAgo = new Date(this.currentDate.getFullYear() - 18, this.currentDate.getMonth(), this.currentDate.getDate());
  formattedDate = `${this.eighteenYearsAgo.getFullYear()}-${String(this.eighteenYearsAgo.getMonth() + 1).padStart(2, '0')}-${String(this.eighteenYearsAgo.getDate()).padStart(2, '0')}`;
  
  form:FormGroup = this.fb.group({
  firstName: new FormControl('asdasd',[Validators.required]),
  lastName: new FormControl('asdadas',[Validators.required]),
  gender: new FormControl('true',[Validators.required]),
  motherName: new FormControl('asdada'),
  middleName: new FormControl('asdasdasd'),
  birthDate: new FormControl('',[Validators.required]),
  fatherName: new FormControl('asdasda'),
  nationalityId: new FormControl('1234', [Validators.required])
})

constructor(private fb:FormBuilder,private customerApiService:CustomerApiService){

  this.form.valueChanges.subscribe(() => {
    this.isFormValid = this.form.valid;
  });
}



onSubmitForm() {
  console.log("butona basıldı")
  this.form.valid ? this.createCustomer() : console.error('Form is invalid', this.form.value);
}


createCustomer() {
  const createCustomerRequest : CreateCustomerRequest={
    firstName:this.form.value.firstName,
    lastName:this.form.value.lastName,
    gender:this.form.value.gender,
    motherName:this.form.value.motherName,
    middleName:this.form.value.middleName,
    birthDate:this.form.value.birthDate,
    fatherName:this.form.value.fatherName,
    nationalityIdentity:this.form.value.nationalityId,
    email:"deneme"
  };
  debugger;
  this.customerApiService.postCustomer(createCustomerRequest).subscribe({
    next(createCustomerRequest) {
      console.log("Başarılı");
  },
  error(err) {
      console.error('Error',err);
  },
  complete:() => {
    console.info("Customer create succesfully");
    this.form.reset();
  }
  })
}
}
