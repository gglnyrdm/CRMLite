import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
    ReactiveFormsModule
  ],
  templateUrl: './customer-info-form.component.html',
  styleUrls: ['./customer-info-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoFormComponent implements OnInit {

  customerId!: string;
  customerInfo!: GetCustomerResponse;
  form: FormGroup;
  gender: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerApiService: CustomerApiService,
    private activatedRoute: ActivatedRoute,
    private change: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      motherName: ['', [Validators.minLength(2)]],
      middleName: ['', [Validators.minLength(2)]],
      birthDate: ['', [Validators.required]],
      fatherName: ['', [Validators.minLength(2)]],
      nationalityIdentity: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe(params => {
      this.customerId = params['id'];
      console.log('pathID:', this.customerId);
      this.getCustomerInfo();
    });
  }

  getCustomerInfo(): void {
    this.customerApiService.getById(this.customerId).subscribe({
      next: (customerDetails) => {
        this.customerInfo = customerDetails;
        console.log(customerDetails);
        this.updateForm();
      }
    });
  }

  updateForm(): void {
    if (this.customerInfo) {
      this.form.patchValue({
        firstName: this.customerInfo.firstName,
        lastName: this.customerInfo.lastName,
        gender: this.customerInfo.gender,
        motherName: this.customerInfo.motherName,
        middleName: this.customerInfo.middleName,
        birthDate: this.customerInfo.birthDate,
        fatherName: this.customerInfo.fatherName,
        nationalityIdentity: this.customerInfo.nationalityIdentity
      });
    }
  }

  updateCustomer(): void {
    const request: PutCustomerRequest = this.form.value;
    this.customerApiService.putCustomer(this.customerId, request).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Error', error);
      },
      complete: () => {
        this.openPopup("Changes have been saved.");
        this.router.navigate(['customer/', this.customerId, 'info']);
      }
    });
  }

  onSubmitForm(): void {
    if (this.form.invalid) {
      console.error('Form is invalid');
    } else {
      console.log('Form submission successful');
      this.updateCustomer();
    }
  }

  goPrevious(): void {
    this.router.navigate(['customer/', this.customerId, 'info']);
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