import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchCustomerRequest } from '../models/requests/search/search-customer-request';
import { SearchCustomerResponse } from '../models/responses/search/search-customer-response';

@Injectable({
  providedIn: 'root'
})
export class SearchCustomerApiService {

  constructor(private httpClient: HttpClient) {}

  getBySearchFilter(params:String): Observable<SearchCustomerResponse[]> {
    return this.httpClient.get<SearchCustomerResponse[]>(
      `http://localhost:8082/api/v1/search-service?${params}`,
    );
  }

}
