import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerApiService } from '../../../features/customers/services/customerApi.service';
import { GetCustomerResponse } from '../../../features/customers/models/responses/customer/get-customer-response';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupWithButtonsComponent } from '../../../shared/components/dialog-popup-with-buttons/dialog-popup-with-buttons.component';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss'
})
export class CustomerInfoComponent {

customerId!: string;
customerInfo!: GetCustomerResponse;
gender:string;

  constructor(
  private customerApiService: CustomerApiService,
  private change: ChangeDetectorRef,
  private activatedRoute: ActivatedRoute,
  private router:Router,
  private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params => {
      this.customerId = params['id'];
      console.log(this.customerId,"customerId")
      console.log(params)

    }).unsubscribe();
    this.getCustomerInfo();
  }

  getCustomerInfo(){
    this.customerApiService.getById(this.customerId).subscribe({
      next: (customerDetails) => {
        this.customerInfo = customerDetails;
        console.log(customerDetails)
      },
      complete: () => {
        this.change.markForCheck();
        this.getGender();
      }
    })
  }

  updateCustomerInfo(){
    this.router.navigate([`/customer/${this.customerId}/info-update`])
  }
  getGender() {
    if(this.customerInfo.gender == true) {
      this.gender = 'Female';
    }
    else {
      this.gender = 'Male';
    }
  }
  deleteCustomerInfo() {
    // Silme işlemi öncesinde onay iletişim kutusunu aç
    const dialogRef = this.dialog.open(DialogPopupWithButtonsComponent, {
      data: { message: 'Are you sure to delete this customer ?' }
    });

    // İletişim kutusu kapatıldığında yapılacak işlemler
    dialogRef.afterClosed().subscribe(result => {
      // Kullanıcı 'Evet' seçeneğini seçtiyse, müşteriyi sil
      if (result) {
        // Müşteriyi silme işlemleri
      }
    });
  }
    
}
