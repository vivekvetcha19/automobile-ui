import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CarModel } from '../models/car-model.model';
import { CreateCarModel } from '../models/create-car-model.model';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  private apiUrl = 'http://localhost:5181/api/CarModel';

  constructor(private http: HttpClient) {}

  getModels(): Observable<CarModel[]> {

    return this.http.get<CarModel[]>(this.apiUrl);

  }

//   getModelById(id: number): Observable<CarModel> {

//     return this.http.get<CarModel>(
//       `${this.apiUrl}/${id}`
//     );

//   }

  createModel(model: CreateCarModel): Observable<CarModel> {

    return this.http.post<CarModel>(
      this.apiUrl,
      model
    );

  }

  updateModel(model: any): Observable<CarModel> {

    return this.http.put<CarModel>(
      `${this.apiUrl}/${model.id}`,
      model
    );

  }

  deleteModel(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}