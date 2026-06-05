import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Customer } from '../models/customer.model';
import { CreateCustomer } from '../models/create-customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl =
    'http://localhost:5181/api/Customer';

  constructor(
    private http: HttpClient
  ) {}

  getCustomers(): Observable<Customer[]> {

    return this.http.get<Customer[]>(
      this.apiUrl
    );

  }

  createCustomer(
    customer: CreateCustomer
  ): Observable<Customer> {

    return this.http.post<Customer>(
      this.apiUrl,
      customer
    );

  }

  updateCustomer(
    customer: any
  ): Observable<Customer> {

    return this.http.put<Customer>(
      `${this.apiUrl}/${customer.id}`,
      customer
    );

  }

  deleteCustomer(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}