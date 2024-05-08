import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberInputDirective } from '../../../../core/directives/only-number-input.directive';
import { RouterModule } from '@angular/router';

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
  form:FormGroup = this.fb.group({
    email: new FormControl(''),
    mobilePhone: new FormControl('+90'),
    homePhone: new FormControl('+90'),
    fax: new FormControl('+90'),
  });
  constructor(private fb:FormBuilder){}
}
