import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CustomerApiService } from '../../services/customerApi.service';
import { GetCustomerResponse } from '../../models/responses/customer/get-customer-response';
import { PutCustomerRequest } from '../../models/requests/customer/put-customer-request';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogPopupComponent } from '../../../../shared/components/dialog-popup/dialog-popup.component';

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
    private dialog: MatDialog

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
      firstName: [`${this.customerInfo.firstName}`,[Validators.required,Validators.minLength(2)]],
      lastName: [`${this.customerInfo.lastName}`,[Validators.required,Validators.minLength(2)]],
      gender: ['',[Validators.required]],
      motherName: [`${this.customerInfo.motherName}`,[Validators.minLength(2)]],
      middleName: [`${this.customerInfo.middleName}`,[Validators.minLength(2)]],
      birthDate: [`${this.customerInfo.birthDate}`,[Validators.required]],
      fatherName: [`${this.customerInfo.fatherName}`,[Validators.minLength(2)]],
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
        this.openPopup("Changes have been saved.");
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

    openPopup(message: string): void {
      const dialogRef: MatDialogRef<DialogPopupComponent> = this.dialog.open(DialogPopupComponent, {
        data: { message: message },
        panelClass: 'custom-dialog-container'
      });
    
      setTimeout(() => {
        dialogRef.close();
      }, 2500); 
    }
}
