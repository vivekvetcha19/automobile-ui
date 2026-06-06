import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Revenue } from '../models/revenue.model';
import { SalesByBrand } from '../models/sales-by-brand.model';
import { TopSellingModel } from '../models/top-selling-model.model';
import { LowStock } from '../models/low-stock.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private apiUrl =
    'http://localhost:5181/api/Analytics';

  constructor(
    private http: HttpClient
  ) {}

  getTotalRevenue(): Observable<Revenue> {

    return this.http.get<Revenue>(
      `${this.apiUrl}/total-revenue`
    );

  }

  getSalesByBrand(): Observable<SalesByBrand[]> {

    return this.http.get<SalesByBrand[]>(
      `${this.apiUrl}/sales-by-brand`
    );

  }

  getTopModels(): Observable<TopSellingModel[]> {

    return this.http.get<TopSellingModel[]>(
      `${this.apiUrl}/top-models`
    );

  }

  getLowStock(): Observable<LowStock[]> {

    return this.http.get<LowStock[]>(
      `${this.apiUrl}/low-stock`
    );

  }

}