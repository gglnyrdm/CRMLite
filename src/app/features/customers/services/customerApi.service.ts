import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateCustomerRequest } from '../models/requests/create-customer-request';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  // private apiControllerUrl = `${environment.apiUrl}/individualCustomer`;
  private apiControllerUrl = `${environment.apiUrl}/individualCustomers`;


  constructor(private http:HttpClient) { }

  postCustomer(createCustomerRequest : CreateCustomerRequest) : Observable<String>{
    return this.http.post<String>(
      this.apiControllerUrl,createCustomerRequest
    );
  }
}
