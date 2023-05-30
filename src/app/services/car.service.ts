import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private readonly http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('http://localhost:3000/cars');
  }

  getCarById(carId: number): Observable<Car> {
    return this.http.get<Car>(`http://localhost:3000/cars/${carId}`);
  }

  markCarAsUnavailable(carId: number) {
    return this.http.patch<Car>(`http://localhost:3000/cars/${carId}`, {
      available: false,
    });
  }
}
