import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetCitiesResponse } from '../models/responses/address/get-cities-response';
import { Observable } from 'rxjs';
import { PostAddressRequest } from '../models/requests/address/post-address-request';
import { PostAddressResponse } from '../models/responses/address/post-address-response';


@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  constructor(private http:HttpClient) { }
  post(address: PostAddressRequest): Observable<PostAddressResponse> {
    debugger;
    return this.http.post<PostAddressResponse>('http://localhost:8081/api/v1/addresses', address);
  }

  getCities(): Observable<GetCitiesResponse[]> {
    return this.http.get<GetCitiesResponse[]>('http://localhost:8081/customerservice/api/v1/cities')
  }


}
