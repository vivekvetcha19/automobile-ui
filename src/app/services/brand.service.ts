import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = 'http://localhost:5181/api/Brand';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }
}