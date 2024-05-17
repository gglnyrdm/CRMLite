import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCatalogResponse } from '../models/responses/catalog/get-catalog-response';

@Injectable({
  providedIn: 'root'
})
export class CatalogApiService {

  constructor(private http:HttpClient) { }

  getCatalogs(): Observable<GetCatalogResponse[]> {
    return this.http.get<GetCatalogResponse[]>('http://localhost:8083/api/v1/catalogs')
  }
}
