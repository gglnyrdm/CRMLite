import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateCustomerRequest } from '../models/requests/customer/create-customer-request';
import { __param } from 'tslib';
import { PostCustomerResponse } from '../models/responses/customer/post-customer-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  private apiControllerUrl = `${environment.apiUrl}/individualCustomers`;


  constructor(private http:HttpClient) { }

  postCustomer(createCustomerRequest : CreateCustomerRequest) : Observable<PostCustomerResponse>{
    return this.http.post<PostCustomerResponse>(
      this.apiControllerUrl,createCustomerRequest
    );
  }
}
