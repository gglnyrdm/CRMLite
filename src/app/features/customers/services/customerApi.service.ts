import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCustomerRequest } from '../models/requests/customer/create-customer-request';
import { __param } from 'tslib';
import { PostCustomerResponse } from '../models/responses/customer/post-customer-response';
import { GetCustomerResponse } from '../models/responses/customer/get-customer-response';
import { PutCustomerRequest } from '../models/requests/customer/put-customer-request';
import { PutCustomerResponse } from '../models/responses/customer/put-customer-response';
import { CheckNationalityIdentityOnMernis } from '../models/requests/customer/check-nationality-identity-on-mernis-request';
import { environmentDevelopment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  private apiControllerUrl = `${environmentDevelopment.customerServiceapiUrl}`;


  constructor(private http:HttpClient) { }

  postCustomer(createCustomerRequest : CreateCustomerRequest) : Observable<PostCustomerResponse>{
    return this.http.post<PostCustomerResponse>(
      this.apiControllerUrl,createCustomerRequest
    );
  }

  putCustomer(id: string, customer: PutCustomerRequest): Observable<PutCustomerResponse>{
    debugger;
    return this.http.put<PutCustomerResponse>
    (`${this.apiControllerUrl}/${id}`,customer)
  }

  getById(id: string): Observable<GetCustomerResponse> {
    return this.http.get<GetCustomerResponse>(`${this.apiControllerUrl}/${id}`)
  }

  checkNationalityIdentityExists(nationalityIdentity:String):Observable<Boolean>{
    debugger;
    return this.http.get<Boolean>(
      `${this.apiControllerUrl}/nationality-identity/${nationalityIdentity}`
    );
  }
  checkNationalityIdentityOnMernis(request:CheckNationalityIdentityOnMernis):Observable<Boolean>{
    debugger;
    return this.http.post<Boolean>(
      `http://localhost:8081/api/v1/individualCustomers/nationality-identity/check`,request
    );
  }
}
