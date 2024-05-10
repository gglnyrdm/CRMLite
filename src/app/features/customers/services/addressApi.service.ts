import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetCitiesResponse } from '../models/responses/address/get-cities-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  // private apiControllerUrl = `${environment.apiUrl}/city`;

  constructor(private http:HttpClient) { }

  getCities(): Observable<GetCitiesResponse[]> {
    return this.http.get<GetCitiesResponse[]>('http://localhost:8081/customerservice/api/v1/cities')
  }

}
