import { Injectable } from '@angular/core';
import { PostContactMediumRequest } from '../models/requests/contactMedium/post-contact-medium-request';
import { PostContactMediumResponse } from '../models/responses/contactMedium/post-contact-medium-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactMediumApiService {

  constructor(private http:HttpClient) { }
  post( contactMedium: PostContactMediumRequest): Observable<PostContactMediumResponse> {
    return this.http.post<PostContactMediumResponse>(
      'http://localhost:8081/customerservice/api/v1/contact-mediums',contactMedium
    );
  }

  // getById(customerId: string): Observable<GetContactMediumRequestDto>{
  //   return this.http.get<GetContactMediumRequestDto>(`http://localhost:8081/customerservice/api/v1/contact-mediums/${customerId}`)
  // }
}
