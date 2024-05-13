import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateCustomerRequest } from '../models/requests/customer/create-customer-request';
import { __param } from 'tslib';
import { PostCustomerResponse } from '../models/responses/customer/post-customer-response';
import { GetCustomerResponse } from '../models/responses/customer/get-customer-response';

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

  getById(id: number): Observable<GetCustomerResponse> {
    return this.http.get<GetCustomerResponse>(`http://localhost:8081/api/v1/individualCustomers/${id}`)
  }
}
