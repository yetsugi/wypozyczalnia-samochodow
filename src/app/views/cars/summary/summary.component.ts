import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from 'src/app/models/car';
import { Order } from 'src/app/models/order';

import { CarService } from 'src/app/services/car.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
  car$!: Observable<Car>;

  order!: Order;

  constructor(
    private readonly orderService: OrderService,
    private readonly carService: CarService
  ) {}

  ngOnInit(): void {
    this.order = this.orderService.getOrder()!;

    this.car$ = this.carService.getCarById(this.order.carId!);
  }

  getPaymentMethodLabel(): string {
    switch (this.order.formData!.paymentMethod) {
      case 'transfer':
        return 'Przelew';
      case 'on-site':
        return 'Przy odbiorze';
    }

    return '';
  }
}
