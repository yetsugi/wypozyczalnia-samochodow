import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly KEY = 'order';

  constructor() {}

  getOrder(): Order | null {
    const rawOrder = sessionStorage.getItem(this.KEY);

    if (!rawOrder) {
      return null;
    }

    return JSON.parse(rawOrder);
  }

  saveOrder(order: Order): void {
    sessionStorage.setItem(this.KEY, JSON.stringify(order));
  }

  removeOrder(): void {
    sessionStorage.removeItem(this.KEY);
  }

  setCarId(carId: number): void {
    let order = this.getOrder() ?? {};

    order.carId = carId;

    this.saveOrder(order);
  }
}
