import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Insurance } from '../models/insurance.model';
import { CreateInsurance } from '../models/create-insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private apiUrl =
    'http://localhost:5181/api/Insurance';

  constructor(
    private http: HttpClient
  ) {}

  getInsurances(): Observable<Insurance[]> {

    return this.http.get<Insurance[]>(
      this.apiUrl
    );

  }

  createInsurance(
    insurance: CreateInsurance
  ): Observable<Insurance> {

    return this.http.post<Insurance>(
      this.apiUrl,
      insurance
    );

  }

}