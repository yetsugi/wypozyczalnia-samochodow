import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { OrderFormData } from '../models/order-form-data';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly KEY = 'order';

  constructor(private readonly http: HttpClient) {}

  getOrder(): Order | null {
    const rawOrder = sessionStorage.getItem(this.KEY);

    if (rawOrder) {
      return JSON.parse(rawOrder);
    }

    return null;
  }

  saveOrder(order: Order): void {
    sessionStorage.setItem(this.KEY, JSON.stringify(order));
  }

  removeOrder(): void {
    sessionStorage.removeItem(this.KEY);
  }

  postOrder(): Observable<Order> {
    const order = this.getOrder()!;

    return this.http
      .post<Order>('http://localhost:3000/orders', order)
      .pipe(tap((order) => this.saveOrder(order)));
  }

  setCarId(carId: number): void {
    const order = this.getOrder() ?? {};

    order.carId = carId;

    this.saveOrder(order);
  }

  setFormData(orderFormData: OrderFormData): void {
    const order = this.getOrder() ?? {};

    order.formData = orderFormData;

    this.saveOrder(order);
  }

  hasCarId(): boolean {
    const order = this.getOrder();

    return Boolean(order && order.carId);
  }

  hasAllProperties(): boolean {
    const order = this.getOrder();

    return Boolean(order && order.id && order.carId && order.formData);
  }
}
