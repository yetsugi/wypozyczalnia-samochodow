import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private readonly http: HttpClient) {}

  getBrands(): Observable<string[]> {
    return this.getCars().pipe(
      map((cars) => [...new Set(cars.map((car) => car.brand))])
    );
  }

  getBrandOptions(): Observable<{ value: string; label: string }[]> {
    return this.getBrands().pipe(
      map((brands) =>
        brands.map((brand) => {
          return {
            value: brand,
            label: brand,
          };
        })
      )
    );
  }

  getCars(
    filters?: { name: string; value: string | boolean }[]
  ): Observable<Car[]> {
    let params = new HttpParams();

    filters?.forEach(
      (filter) => (params = params.set(filter.name, filter.value))
    );

    return this.http.get<Car[]>('http://localhost:3000/cars', {
      params: params,
    });
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
