import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerApiService } from '../../services/customerApi.service';
import { GetCustomerResponse } from '../../models/responses/customer/get-customer-response';
import { PutCustomerRequest } from '../../models/requests/customer/put-customer-request';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogPopupComponent } from '../../../../shared/components/dialog-popup/dialog-popup.component';
import { CheckNationalityIdentityOnMernis } from '../../models/requests/customer/check-nationality-identity-on-mernis-request';
import { OnlyLetterDirective } from '../../../../core/directives/only-letter.directive';
import { OnlyNumberInputDirective } from '../../../../core/directives/only-number-input.directive';

@Component({
  selector: 'app-customer-info-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OnlyLetterDirective,
    OnlyNumberInputDirective
  ],
  templateUrl: './customer-info-form.component.html',
  styleUrls: ['./customer-info-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoFormComponent implements OnInit {

  currentDate = new Date();
  eighteenYearsAgo = new Date(this.currentDate.getFullYear() - 18, this.currentDate.getMonth(), this.currentDate.getDate());
  formattedDate = `${this.eighteenYearsAgo.getFullYear()}-${String(this.eighteenYearsAgo.getMonth() + 1).padStart(2, '0')}-${String(this.eighteenYearsAgo.getDate()).padStart(2, '0')}`;

  customerId!: string;
  customerInfo!: GetCustomerResponse;
  form!: FormGroup;
  checkNationalityIdentityOnMernisObject: CheckNationalityIdentityOnMernis;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerApiService: CustomerApiService,
    private activatedRoute: ActivatedRoute,
    private change: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', [Validators.required]],
      motherName: ['', [Validators.minLength(2)]],
      middleName: ['', [Validators.minLength(2)]],
      birthDate: ['', [Validators.required]],
      fatherName: ['', [Validators.minLength(2)]],
      nationalityIdentity: ['', [Validators.required,Validators.minLength(11)]]
    });

    this.activatedRoute.parent?.params.subscribe(params => {
      this.customerId = params['id'];
      console.log('pathID:', this.customerId);
      this.getCustomerInfo();
    });
  }

  checkNationalityIdentityOnMernis() {
    const birthDateValue = this.form.value.birthDate;
    let birthDate: Date;
  
    if (typeof birthDateValue === 'string') {
      birthDate = new Date(birthDateValue);
    } else {
      birthDate = birthDateValue;
    }
    this.checkNationalityIdentityOnMernisObject = {
      nationalityIdentity: this.form.value.nationalityIdentity,
      firstName: this.checkMiddleName(),
      lastName: this.form.value.lastName,
      birthDate: birthDate.getFullYear()
    };
  
    // MERNİS kontrolünü gerçekleştir
    this.customerApiService.checkNationalityIdentityOnMernis(this.checkNationalityIdentityOnMernisObject).subscribe({
      next: async (response) => {
        if (!response) {
          // MERNİS doğrulaması başarılı, müşteriyi güncelle
          this.customerApiService.putCustomer(this.customerId, this.form.value).subscribe({
            next: () => {},
            error: (error) => {
              console.error('Error updating customer:', error);
            },
            complete: () => {
              this.openPopup("Changes have been saved.");
              this.router.navigate(['customer/', this.customerId, 'info']);
            }
          });
        } else {
          // MERNİS doğrulaması başarısız
          this.openPopup("You entered an invalid ID.");
          await this.delay(2500);
        }
      },
      error: (err) => {
        console.error('Error checking nationality identity on MERNİS:', err);
      }
    });
  }

  checkMiddleName() {
  if(this.form.value.middleName){
    return this.form.value.firstName+ ' ' +this.form.value.middleName;
  }
  else {
    return this.form.value.firstName;
  }
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
      
      // Change detection'ı manuel olarak tetikleyin
      this.change.detectChanges();
  
      // Formun validasyonunu güncelleyin
      this.form.updateValueAndValidity();
    }
  }

  updateCustomer(): void {
    const request: PutCustomerRequest = this.form.value;
  
    // Eski nationalityIdentity değerini al
    const previousNationalityIdentity = this.customerInfo.nationalityIdentity;
  
    // Yeni nationalityIdentity değerini al
    const newNationalityIdentity = this.form.get('nationalityIdentity')?.value;
  
    // Eğer nationalityIdentity değeri değiştiyse, kontrol et
    if (previousNationalityIdentity !== newNationalityIdentity) {
      // CheckNationalityIdentityOnMernis objesini oluştur
      this.checkNationalityIdentityOnMernis();
    } else {
      // Eğer nationalityIdentity değeri değişmediyse, doğrudan MERNİS kontrolünü yap
      this.checkNationalityIdentityOnMernis();
    }
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
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
}