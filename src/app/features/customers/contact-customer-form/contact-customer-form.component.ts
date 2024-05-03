import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberInputDirective } from '../../../core/directives/only-number-input.directive';
import { OnlyLetterDirective } from '../../../core/directives/only-letter.directive';

@Component({
  selector: 'app-contact-customer-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    OnlyLetterDirective],
  templateUrl: './contact-customer-form.component.html',
  styleUrl: './contact-customer-form.component.scss'
})
export class ContactCustomerFormComponent {

}
