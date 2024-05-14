import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { OnlyNumberInputDirective } from '../../../../../core/directives/only-number-input.directive';
import { OnlyLetterDirective } from '../../../../../core/directives/only-letter.directive';
import { SearchCustomerRequest } from '../../../models/requests/search/search-customer-request';
import { SearchCustomerApiService } from '../../../services/searchCustomerApi.service';
import { SearchCustomerResponse } from '../../../models/responses/search/search-customer-response';


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

  @Output() customerList = new EventEmitter<SearchCustomerResponse[]>();
  customers: any = [];

  isDisabledSearchButton: boolean = true; //SearchButton template binding
  isDisabledClearButton: boolean = true; //ClearButton template binding

  form:FormGroup;

  constructor(
    private fb:FormBuilder,
    private searchCustomerApiService:SearchCustomerApiService
  ){}

  ngOnInit(): void {
    this.createForm();
    this.form.valueChanges.subscribe(() => {
      this.isDisabledSearchButton = this.isFormEmpty();
      this.isDisabledClearButton = this.isFormEmpty();
    });
  }
  createForm() {
    this.form =this.fb.group({
      idNumber: new FormControl(''),
      customerId: new FormControl(''),
      accountNumber: new FormControl(''),
      gsmNumber: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      orderNumber: new FormControl(''),
    });
  }

  createSearchCustomerRequest() {
    debugger;
    const queryParams: string[] = [];
    if(this.form.get('idNumber').value != '')
      {
        queryParams.push(this.form.get('idNumber')?.value ? `nationalityIdentity=${this.form.get('idNumber')?.value}` : '');
      }
    if(this.form.get('customerId').value != '')
      {
        queryParams.push(this.form.get('customerId')?.value ? `customerId=${this.form.get('customerId')?.value}` : '');

      }
    if(this.form.get('accountNumber').value != '')
      {
        queryParams.push(this.form.get('accountNumber')?.value ? `accountNumber=${this.form.get('accountNumber')?.value}` : '');

      }
    if(this.form.get('gsmNumber').value != '')
        {
        queryParams.push(this.form.get('gsmNumber')?.value ? `mobilePhone=${this.form.get('gsmNumber')?.value}` : '');

        }
    if(this.form.get('firstName').value != '')
      {
        queryParams.push(this.form.get('firstName')?.value ? `firstName=${this.form.get('firstName')?.value}` : '');
      }
    if(this.form.get('lastName').value != '')
      {
          queryParams.push(this.form.get('lastName')?.value ? `lastName=${this.form.get('lastName')?.value}` : '');
      }
    if(this.form.get('orderNumber').value != '')
      {
          queryParams.push(this.form.get('orderNumber')?.value ? `orderNumber=${this.form.get('orderNumber')?.value}` : '');
      }
    
    const queryString = queryParams.join('&');

    this.searchCustomerApiService.getBySearchFilter(queryString).subscribe(response => {
      this.customers = response;
      this.customerList.emit(this.customers);
    console.log(response);
  })
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
  
  

onSubmitForm() {
  if(this.form.invalid)
    {
      
      console.error('Form in invalid');
    }
    else{
      console.log('Basarili');
      this.createSearchCustomerRequest();
    }
}
}
