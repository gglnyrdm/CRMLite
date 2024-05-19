import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerApiService } from '../../../features/customers/services/customerApi.service';
import { GetCustomerResponse } from '../../../features/customers/models/responses/customer/get-customer-response';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogPopupWithButtonsComponent } from '../../../shared/components/dialog-popup-with-buttons/dialog-popup-with-buttons.component';
import { DialogPopupComponent } from '../../../shared/components/dialog-popup/dialog-popup.component';

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
        localStorage.setItem('customerId', this.customerInfo.customerId);
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
    
    const dialogRef = this.dialog.open(DialogPopupWithButtonsComponent, {
      data: { message: 'Are you sure to delete this customer ?' }
    });

    // İletişim kutusu kapatıldığında yapılacak işlemler
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clickYesButton();
      }
    });
  }

  async clickYesButton() : Promise<void> {
    //Kullanıcı aktif ürünü var mı sorgusu yapılacak
    this.openPopup("The customer has been deleted.");
    await this.delay(2500);
    this.router.navigate([`/searchcustomer`])
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
