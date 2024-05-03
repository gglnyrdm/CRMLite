import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  firstName: new FormControl('',[Validators.required]),
  lastName: new FormControl('',[Validators.required]),
  gender: new FormControl('',[Validators.required]),
  motherName: new FormControl(''),
  middleName: new FormControl(''),
  birthDate: new FormControl(''),
  fatherName: new FormControl(''),
  nationalityId: new FormControl('',[Validators.required])
})

constructor(private fb:FormBuilder){}

onSubmitForm() {
  if(this.form.invalid)
    {
      
      console.error('Form in invalid');
    }
    else{
      console.log('Basarili');

    }
}
  
}
