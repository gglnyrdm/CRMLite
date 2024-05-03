import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberInputDirective } from '../../../core/directives/only-number-input.directive';

@Component({
  selector: 'app-contact-customer-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    ],
  templateUrl: './contact-customer-form.component.html',
  styleUrl: './contact-customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCustomerFormComponent {
  form:FormGroup = this.fb.group({
    email: new FormControl(''),
    mobilePhone: new FormControl('+90'),
    homePhone: new FormControl('+90'),
    fax: new FormControl('+90'),
  });
  constructor(private fb:FormBuilder){}
  
}
