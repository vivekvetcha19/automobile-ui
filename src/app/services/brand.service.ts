import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand.model';
import { CreateBrand } from '../models/create-brand.model';
import { UpdateBrand } from '../models/update-brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = 'http://localhost:5181/api/Brand';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  createBrand(brand: CreateBrand): Observable<any> {
  return this.http.post(this.apiUrl, brand);
  }

  updateBrand(brand: UpdateBrand): Observable<any> {

  return this.http.put(
    `${this.apiUrl}/${brand.id}`,
    brand
  );

  }

  deleteBrand(id: number): Observable<any> {

  return this.http.delete(
    `${this.apiUrl}/${id}`
  );

  }
}