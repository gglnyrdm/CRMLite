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
form:FormGroup = this.fb.group({
  firstName: new FormControl('asdasd'),
  lastName: new FormControl('asdadas',),
  gender: new FormControl('true'),
  motherName: new FormControl('asdada'),
  middleName: new FormControl('asdasdasd'),
  birthDate: new FormControl('2024-05-06T18:46:40.165Z'),
  fatherName: new FormControl('asdasda'),
  nationalityId: new FormControl('1234')
})

constructor(private fb:FormBuilder,private customerApiService:CustomerApiService){}

onSubmitForm() {
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
