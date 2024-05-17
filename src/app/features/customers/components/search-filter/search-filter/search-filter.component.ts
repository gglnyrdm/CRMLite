import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyNumberInputDirective } from '../../../../../core/directives/only-number-input.directive';
import { OnlyLetterDirective } from '../../../../../core/directives/only-letter.directive';
import { SearchCustomerRequest } from '../../../models/requests/search/search-customer-request';
import { SearchCustomerApiService } from '../../../services/searchCustomerApi.service';
import { SearchCustomerResponse } from '../../../models/responses/search/search-customer-response';
import { CustomerIdDirective } from '../../../../../core/directives/customer-id.directive';


@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    OnlyLetterDirective,
    CustomerIdDirective
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
      this.isDisabledSearchButton = this.isFormInvalid();
      this.isDisabledClearButton = this.isFormEmpty();
    });
    this.form.statusChanges.subscribe(() => {
      this.isDisabledSearchButton = this.isFormInvalid();
    });
  }
  
  createForm() {
    this.form =this.fb.group({
      idNumber: new FormControl('',[Validators.pattern(/^\d+$/)]),
      customerId: new FormControl('',[Validators.pattern(/^[a-zA-Z0-9\-]*$/)]),
      accountNumber: new FormControl('',[Validators.pattern(/^\d+$/)]),
      gsmNumber: new FormControl('',[Validators.pattern(/^\d+$/)]),
      firstName: new FormControl('',[Validators.pattern(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/)]),
      lastName: new FormControl('', [Validators.pattern(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/)]),
      orderNumber: new FormControl('',[Validators.pattern(/^\d+$/)]),
    });
  }

  createSearchCustomerRequest() {
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
  
  isFormInvalid(): boolean {
    return this.form.invalid || this.isFormEmpty();
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
