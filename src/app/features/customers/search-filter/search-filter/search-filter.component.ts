import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyNumberInputDirective } from '../../../../core/directives/only-number-input.directive';
import { log } from 'console';
import { OnlyLetterDirective } from '../../../../core/directives/only-letter.directive';


@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    OnlyLetterDirective
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {
  @ViewChild('searchButton') searchButton!: ElementRef;

  isDisabledSearchButton: boolean = true; //SearchButton template binding
  isDisabledClearButton: boolean = true; //ClearButton template binding



  form:FormGroup = this.fb.group({
    idNumber: new FormControl(''),
    customerId: new FormControl(''),
    accountNumber: new FormControl(''),
    gsmNumber: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    orderNumber: new FormControl(''),
  });
  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.isDisabledSearchButton = this.isFormEmpty();
      this.isDisabledClearButton = this.isFormEmpty();
    });
    
  }
  isFormEmpty(): boolean {
    const formValues = this.form.value;
    for (const key in formValues) {
      if (formValues[key]) {
        
        return false;
      }
    }
    return true;
  }
  
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
