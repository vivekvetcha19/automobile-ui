import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Inventory } from '../models/inventory.model';
import { CreateInventory } from '../models/create-inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl =
    'http://localhost:5181/api/Inventory';

  constructor(
    private http: HttpClient
  ) {}

  getInventory(): Observable<Inventory[]> {

    return this.http.get<Inventory[]>(
      this.apiUrl
    );

  }

  createInventory(
    inventory: CreateInventory
  ): Observable<Inventory> {

    return this.http.post<Inventory>(
      this.apiUrl,
      inventory
    );

  }

  updateInventory(
    inventory: any
  ): Observable<Inventory> {

    return this.http.put<Inventory>(
      `${this.apiUrl}/${inventory.id}`,
      inventory
    );

  }

  deleteInventory(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}