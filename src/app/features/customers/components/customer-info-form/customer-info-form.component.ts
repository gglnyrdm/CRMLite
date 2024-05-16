import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CustomerApiService } from '../../services/customerApi.service';
import { GetCustomerResponse } from '../../models/responses/customer/get-customer-response';
import { PutCustomerRequest } from '../../models/requests/customer/put-customer-request';

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
  

  customerId!: string;
  customerInfo!: GetCustomerResponse;
  form:FormGroup;
  gender:string;

  getGender() {
    if(this.customerInfo.gender == true)
      {
        this.gender = 'Female';
      }
      else {
        this.gender = 'Male';
      }
  }

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private customerApiService: CustomerApiService,
    private activatedRoute: ActivatedRoute,
    private change: ChangeDetectorRef,

  ){}

  ngOnInit():void {
    this.activatedRoute.parent.params.subscribe(params => {
    this.customerId = params['id'];
    console.log('pathID:', this.customerId);
    this.getCustomerInfo();
    this.getGender();
    }).unsubscribe();
  }


  getCustomerInfo(){
    this.customerApiService.getById(this.customerId).subscribe({
      next: (customerDetails) => {
        this.customerInfo = customerDetails;
        console.log(customerDetails)

      },
      complete: () => {
    this.createForm();
        

      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      firstName: [`${this.customerInfo.firstName}`,[Validators.required]],
      lastName: [`${this.customerInfo.lastName}`,[Validators.required]],
      gender: ['',[Validators.required]],
      motherName: [`${this.customerInfo.motherName}`],
      middleName: [`${this.customerInfo.middleName}`],
      birthDate: [`${this.customerInfo.birthDate}`],
      fatherName: [`${this.customerInfo.fatherName}`],
      nationalityIdentity: [`${this.customerInfo.nationalityIdentity}`,[Validators.required]]
    });
  }

  updateCustomer(){
    const request: PutCustomerRequest = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      birthDate: this.form.value.birthDate,
      gender: this.form.value.gender,
      fatherName: this.form.value.fatherName,
      motherName: this.form.value.motherName,
      nationalityIdentity: this.form.value.nationalityIdentity,
    };
    debugger;
    this.customerApiService.putCustomer(this.customerId, request).subscribe({
      next: (response) =>{},
      error: (error) => {
        console.error('Error', error)
      },
      complete: () => {
        // this.form.reset();
        this.router.navigate(['customer/',this.customerId ,'info'])
      }
    })
  }

  onSubmitForm() {
    if(this.form.invalid)
      {
        console.error('Form in invalid');
      }
      else{
        console.log('Basarili');
        this.updateCustomer();
      }
  }

  goPrevious() {
    this.router.navigate(['customer/',this.customerId ,'info'])
    }
}
