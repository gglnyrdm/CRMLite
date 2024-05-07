import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-info-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule],
  templateUrl: './customer-info-form.component.html',
  styleUrl: './customer-info-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoFormComponent {
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
