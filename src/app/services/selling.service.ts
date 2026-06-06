import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Selling } from '../models/selling.model';
import { CreateSelling } from '../models/create-selling.model';

@Injectable({
  providedIn: 'root'
})
export class SellingService {

  private apiUrl =
    'http://localhost:5181/api/Selling';

  constructor(
    private http: HttpClient
  ) {}

  getSales(): Observable<Selling[]> {

    return this.http.get<Selling[]>(
      this.apiUrl
    );

  }

  createSale(
    sale: CreateSelling
  ): Observable<Selling> {

    return this.http.post<Selling>(
      this.apiUrl,
      sale
    );

  }

}