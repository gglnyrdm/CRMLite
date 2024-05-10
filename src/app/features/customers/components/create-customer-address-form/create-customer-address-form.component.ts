import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddressApiService } from '../../services/addressApi.service';

@Component({
  selector: 'app-create-customer-address-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-customer-address-form.component.html',
  styleUrl: './create-customer-address-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerAddressFormComponent {

  form:FormGroup;


  constructor( 
    private fb:FormBuilder,
    private addressApi:AddressApiService
  ) {}

  ngOnInit():void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      city: ['', Validators.required],
       street: ['', Validators.required], //,Validators.maxLength(50) hata veriyor.
      houseFlatNumber: ['', Validators.required], //,Validators.maxLength(20) hata veriyor
      addressDescription: ['', Validators.required], //,Validators.maxLength(150) hata veriyor
    });
  }

  onSubmitForm() {
    console.log("Save çalışıyor");
    } 

}
