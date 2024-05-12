import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyNumberInputDirective } from '../../../../core/directives/only-number-input.directive';
import { RouterModule } from '@angular/router';
import { EmailFormatDirective } from '../../../../core/directives/email-format.directive';

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
  form:FormGroup = this.fb.group({
    email: new FormControl('',[Validators.required]), //,Validators.maxLength(250)
    mobilePhone: new FormControl('+90',[Validators.required]),
    homePhone: new FormControl('+90'),
    fax: new FormControl('+90'),
  });
  constructor(private fb:FormBuilder){}
  
}
