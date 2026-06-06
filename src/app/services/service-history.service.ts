import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ServiceHistory } from '../models/service-history.model';
import { CreateServiceHistory } from '../models/create-service-history.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceHistoryService {

  private apiUrl =
    'http://localhost:5181/api/ServiceHistory';

  constructor(
    private http: HttpClient
  ) {}

  getServices(): Observable<ServiceHistory[]> {

    return this.http.get<ServiceHistory[]>(
      this.apiUrl
    );

  }

  createService(
    service: CreateServiceHistory
  ): Observable<ServiceHistory> {

    return this.http.post<ServiceHistory>(
      this.apiUrl,
      service
    );

  }

}