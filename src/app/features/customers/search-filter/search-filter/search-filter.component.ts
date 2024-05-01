import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyNumberInputDirective } from '../../../../core/directives/only-number-input-directive';
import { log } from 'console';


@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnlyNumberInputDirective,
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {

  form:FormGroup = this.fb.group({
    idNumber: new FormControl('', [Validators.required]),
    customerId: new FormControl(''),
    accountNumber: new FormControl(''),
    gsmNumber: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    orderNumber: new FormControl(''),
  });
  constructor(private fb:FormBuilder){}

onSubmitForm() {
  debugger;
  if(this.form.invalid)
    {
      
      console.error('Form in invalid');
    }
    else{
      console.log('Basarili');

    }
}
}
